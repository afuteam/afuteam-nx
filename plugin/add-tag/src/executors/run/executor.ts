import { RunExecutorSchema } from './schema';
import * as fs from 'fs';
import axios from 'axios';
import * as dayjs from 'dayjs';
import Tools from './utils/index.js';

export default async function runExecutor(options: RunExecutorSchema) {
  console.log('\n@afuteam-nx/plugin-add-tag插件执行 \n', options);

  const { accessToken, localFileRepoListPath, tagName, resultPath, gitLabBaseUrl } = options;

  let date = '';
  // 传入的时间进行校验
  try {
    date = dayjs(options.date).format('YYYY-MM-DDTHH:mm:ssZ');
  } catch (error) {
    throw new Error('时间格式错误，请使用 YYYY-MM-DDTHH:mm:ssZ 格式');
  }

  const axiosInstance = axios.create({
    baseURL: gitLabBaseUrl + '/api/v4/projects/',
    headers: { 'PRIVATE-TOKEN': accessToken },
  });

  async function loadFileList() {
    const data = await fs.promises.readFile(
      `${localFileRepoListPath}`,
      'utf-8'
    );
    return JSON.parse(data);
  }

  // async function deleteTag(projectId: number) {
  //   try {
  //     await axiosInstance.delete(
  //       `${projectId}/repository/tags/${tagName}`
  //     );
  //   } catch (error) {
  //     console.log('删除标签失败', projectId);
  //   }

  // }

  async function addTag(projectId: number) {
    const res = {
      id: projectId,
      name: '',
      tag_url: '',
      addTagStatus: false,
      addTagMessage: '',
      created_at: '',
      last_activity_at: ''
    }

    try {
      // 获取指定日期之前最近一条数据, ps: 这种方式返回的结果是倒序
      const { data: commits } = await axiosInstance.get(
        `${projectId}/repository/commits?until=${date}&per_page=1`
      );

      if(!commits || commits.length === 0) {
        console.log(`No commits before on ${date}`)
        res.addTagMessage = 'No commits before on ' + date
        return res
      }

      const lastCommit = commits[0]

      // 创建一个新的tag
      const message = `基于日期 ${dayjs(date).format("YYYY-MM-DD HH:mm:ss")} 之前的最近一次提交\n该次提交日期为${dayjs(lastCommit.committed_date).format("YYYY-MM-DD HH:mm:ss")}\n\n创建的技术治理的一个tag\n\n用于后续数据比对`
      const release_description = `tag 创建时间: ${dayjs().format("YYYY-MM-DD HH:mm:ss")}`; // 这将是标签的消息
      await axiosInstance.post(`${projectId}/repository/tags`, {
        tag_name: tagName, // (required) - The name of a tag
        ref: lastCommit.id, // (required) - Create tag using commit SHA, another tag name, or branch name.
        message, // (optional) - Creates annotated tag.
        release_description // (optional) - Add release notes  to the git tag and store it in the GitLab database.
      });

      res.addTagStatus = true;
      return res

    } catch (error) {
      console.error('添加tag失败 ', error.response.data.message);
      res.addTagMessage = error.response.data.message
      return res
    }
  }

  async function main() {
    const execRes = [] // 记录执行的结果
    let allProjects = await loadFileList();

    // 过滤 date 之后创建的项目
    allProjects = allProjects.filter(project => dayjs(project.created_at).isBefore(date))

    // MOCK
    // allProjects = allProjects.filter(project => project.name === 'afu')

    console.log(`将要对${allProjects.length}个项目添加tag\n`)

    if (allProjects && allProjects.length > 0) {
      for (const project of allProjects) {
        const { id, name, web_url, created_at, last_activity_at } = project
        // const deleteTagRes = await deleteTag(id)
        const res = await addTag(id);

        res.created_at  = created_at
        res.name  = name
        res.tag_url  = web_url + '/tags/' + tagName
        res.last_activity_at = last_activity_at

        execRes.push(res)
      }
      Tools.writeRes2SomePath('allReposCreateTagResInfo.json', execRes, resultPath)
    }

  }

  await main();

  return {
    success: true,
  };
}

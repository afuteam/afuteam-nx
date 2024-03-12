import { RunExecutorSchema } from './schema';
import * as path from 'path';
import { execSync } from 'child_process';
import * as fs from 'fs';

export default async function runExecutor(options: RunExecutorSchema) {
  console.log(
    '\n@afuteam-nx/plugin-downloadrepos 下载插件开始运行，参数如下\n',
    options
  );
  const { localFileReposWithRemotePath, localFilesDownLoadPath } = options;
  const successRepositories = [];
  const failedRepositories = [];

  async function loadFileList() {
    const data = await fs.promises.readFile(
      localFileReposWithRemotePath,
      'utf-8'
    );
    return JSON.parse(data);
  }

  function downReopFromGit(repositories) {
    let currentIndex = 0; // 初始化索引计数器
    const allLength = repositories.length;
    for (const repositoryInfo of repositories) {
      const { ssh_url_to_repo, name, default_branch } = repositoryInfo;
      console.log(
        `处理进度 ${currentIndex + 1}/${allLength} ：${
          repositoryInfo.name
        }(${default_branch})`
      );

      // 有 空项目情况
      if (!default_branch || !ssh_url_to_repo) {
        console.log(
          `跳过 ${name}，默认分支: ${default_branch}； ssh_url_to_repo地址是${ssh_url_to_repo}`
        );
        failedRepositories.push(repositoryInfo);
        currentIndex++;
        continue;
      }

      const repositoryPath = path.join(localFilesDownLoadPath, name);

      if (!fs.existsSync(repositoryPath)) {
        console.log(`Cloning repository ${ssh_url_to_repo}...`);
        try {
          execSync(`git clone ${ssh_url_to_repo} ${repositoryPath}`);
          console.log(`Repository ${ssh_url_to_repo} cloned successfully. \n`);
          successRepositories.push(repositoryInfo);
        } catch (error) {
          console.error(
            `Error cloning repository ${ssh_url_to_repo}:`,
            error.message
          );
          failedRepositories.push(repositoryInfo);
          continue;
        }
      } else {
        console.log(`Updating repository ${ssh_url_to_repo}...`);
        try {
          execSync(`git -C ${repositoryPath} pull`);
          console.log(
            `Repository ${ssh_url_to_repo} updated successfully. \n`
          );
          successRepositories.push(repositoryInfo);
        } catch (error) {
          console.error(
            `Error updating repository ${ssh_url_to_repo}:`,
            error.message
          );
          failedRepositories.push(repositoryInfo);
          continue;
        }
      }

      currentIndex++;
    }

    console.log(
      `共处理了 ${repositories.length} 个项目 \n其中成功 ${successRepositories.length}个；\n异常 ${failedRepositories.length}个\n`
    );
    if (failedRepositories.length > 0) {
      console.log('失败的项目列表：');
      failedRepositories.forEach((repositoryInfo) => {
        console.log(`${repositoryInfo.ssh_url_to_repo}\n`);
      });
    }
  }

  async function downloadFile() {
    const allProjects = await loadFileList();

    if (allProjects.length === 0) {
      console.log('没有项目可以处理');
      return false;
    }

    console.log(`一共要处理 ${allProjects.length}个项目\n`);

    downReopFromGit(allProjects);
  }

  await downloadFile();

  return {
    success: true,
  };
}

// 将结果数据上传到gitlab 某个仓库的的 wiki
import { RunExecutorSchema } from './schema';
import * as fs from 'fs';
import axios from 'axios';
import Tools from './utils/index.js';

export default async function runExecutor(options: RunExecutorSchema) {
  console.log('\nupload-json2wiki: Executor ran for Run\n', options);

  const { accessToken, gitLabBaseUrl, uploadRepoId, localJsonfilePath } =
    options;

  if (!accessToken || !gitLabBaseUrl || !uploadRepoId || !localJsonfilePath) {
    console.error('\n请仔细校验配置的参数\n');
    return false;
  }

  async function loadFileList() {
    const data = await fs.promises.readFile(localJsonfilePath, 'utf-8');
    return JSON.parse(data);
  }

  // 上传结果到指定仓库的wiki content中
  async function uploadToWiki(repoId, data) {
    try {
      const wikiTitle = `JsonResult-${Tools.getFormattedDate()}`;
      const postData = {
        id: repoId,
        title: wikiTitle,
        content: JSON.stringify(data),
      };
      const response = await axios(
        `${gitLabBaseUrl}/api/v4/projects/${repoId}/wikis`,
        {
          headers: {
            'PRIVATE-TOKEN': accessToken,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          data: JSON.stringify(postData),
        }
      );
      const detail = await response.data;
      return detail && detail?.slug === wikiTitle;
    } catch (error) {
      console.error(
        'Error occurred while upload projects lint data to wiki:\n',
        error.message
      );
      return false;
    }
  }

  async function upoadLintRes2Wiki() {
    const lintResData = await loadFileList();

    // 上传数据
    const uploadStatus = await uploadToWiki(uploadRepoId, lintResData);
    if (uploadStatus) {
      console.log('上传成功');
    } else {
      console.log('上传失败');
    }
  }

  await upoadLintRes2Wiki();

  return {
    success: true,
  };
}

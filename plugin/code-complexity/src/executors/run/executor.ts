import { RunExecutorSchema } from './schema';
import * as path from 'path';
import * as fs from 'fs';
import { execSync } from 'child_process';

import Tools from './utils/index.js';

export default async function runExecutor(options: RunExecutorSchema) {
  console.log(
    '\n@afutea-nx/plugin-code-complexity插件开始分析代码复杂度，入参',
    options
  );

  const {
    localFileReposWithAFULintTypePath,
    localFilesAllReposCodePath,
    resultPath,
  } = options;

  async function loadFileList() {
    const data = await fs.promises.readFile(
      localFileReposWithAFULintTypePath,
      'utf-8'
    );
    return JSON.parse(data);
  }

  // 执行具体的lint 返回结果
  function runLint(lintType, lintPath) {
    let lintresult = {};

    // 检查path是否存在
    if (!fs.existsSync(lintPath)) {
      return lintresult;
    }

    // 增加缓冲区大小到10MB
    const res = execSync(
      `npx @afuteam/eslint-plugin-fe@latest --type=${lintType} --path=${lintPath}`,
      { encoding: 'utf8', maxBuffer: 1024 * 1024 * 10 }
    );

    // 受nx的影响 输出中包含了一些终端颜色代码 表现为 \u001b 开头的转义序列
    // eslint-disable-next-line no-control-regex
    const cleanRes = res.replace(/\u001b\[\d+m/g, '');

    const match = cleanRes.match(/Total\s+complexityData:\s*(\[.*\])/);

    let complexityData;
    if (match) {
      // Try to parse the matched string as JSON
      try {
        complexityData = JSON.parse(match[1]);
      } catch (error) {
        console.error('Failed to parse complexity data:', error);
      }
    }

    lintresult = {
      complexityData: complexityData,
      complexityDataLength: complexityData.length,
    };

    return lintresult;
  }

  function lintProject(project) {
    const { AFULintType, name } = project;
    const alllintresult = {
      [`${name}`]: {},
    };
    const AFULintTypeKeys = Object.keys(AFULintType);

    const repositoryPath = path.join(localFilesAllReposCodePath, '/', name);

    // 标准的 根目录有 package.json
    if (AFULintTypeKeys.length === 1 && AFULintTypeKeys.includes('root')) {
      let lintRelativePath = repositoryPath + '/src';

      if (!fs.existsSync(lintRelativePath)) {
        lintRelativePath = repositoryPath + '/';
      }

      const res = runLint(AFULintType.root, lintRelativePath);
      alllintresult[name] = res;

      return alllintresult;
    }

    // 根目录 package.josn， 是 uniapp的
    if (
      AFULintTypeKeys.length === 1 &&
      AFULintTypeKeys.includes('root_uniappp')
    ) {
      const lintRelativePath = repositoryPath + '/';
      const res = runLint(AFULintType.root_uniappp, lintRelativePath);
      alllintresult[name] = res;

      return alllintresult;
    }

    function handleCommonFileStruc(keys, curType, curRepoName, curPath) {
      keys.forEach((key) => {
        let lintRelativePath = curPath;
        const lintRelativePathKey = curPath + `/${key}`;
        const lintRelativePathSrc = lintRelativePathKey + '/src';

        // src目录，有就用，没有就不用
        if (fs.existsSync(lintRelativePathSrc)) {
          lintRelativePath = lintRelativePathSrc;
        }

        // 如果key的目录存在，就用，不存在就当前路径计算
        if (fs.existsSync(lintRelativePathKey)) {
          lintRelativePath = lintRelativePathKey;
        }

        const curTypeKey = curType[key];

        if (typeof curTypeKey === 'string') {
          const res = runLint(curTypeKey, lintRelativePath);
          alllintresult[curRepoName][key] = res;
        }

        if (typeof curTypeKey === 'object') {
          handleCommonFileStruc(
            Object.keys(curTypeKey),
            curTypeKey,
            curRepoName,
            lintRelativePath
          );
        }
      });
    }

    if (AFULintTypeKeys.length > 0) {
      handleCommonFileStruc(AFULintTypeKeys, AFULintType, name, repositoryPath);
    }

    return alllintresult;
  }

  async function getFinalRes(allProjects) {
    const allData = [];

    allProjects.forEach((project, index) => {
      let projectLintData = lintProject(project);
      const { id, created_at, last_activity_at, name, web_url } = project;

      const { complexityDataLength, complexityData } = projectLintData[name];

      projectLintData = {
        id,
        created_at,
        last_activity_at,
        name,
        web_url,
        complexityDataLength,
        complexityData,
      };

      console.log(
        `已完成 ${index + 1}/${allProjects.length} : ${project.name} \n`
      );
      allData.push(projectLintData);
    });

    return allData;
  }

  async function main() {
    const allProjects = await loadFileList();
    console.log(`\n项目共有 ${allProjects.length} 个 \n`);

    const getTypeAllProjects = await getFinalRes(allProjects);

    // 指定目录写入结果文件

    Tools.writeRes2SomePath(
      'allProjectsWithCodeComplexity.json',
      getTypeAllProjects,
      resultPath
    );
  }

  await main();

  return {
    success: true,
  };
}

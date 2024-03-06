import { RunExecutorSchema } from './schema';
import * as path from 'path';
import * as fs from 'fs';
import * as Toml from 'toml';
import Tools from './utils/index.js';

export default async function runExecutor(options: RunExecutorSchema) {
  console.log('\npick-keyinfo-from-file-base-repos 插件执行的入参：\n', options);

  const {
    fileType,
    fileName,
    targetKey,
    localFileRepoListPath,
    localAllReposCodePath,
    resultPath,
  } = options;

  async function loadFileList() {
    const data = await fs.promises.readFile(localFileRepoListPath, 'utf-8');
    return JSON.parse(data);
  }

  function findFilePath(startPath, name = '') {
    const filePath = path.join(startPath, name);
    if (fs.existsSync(filePath)) {
      return filePath;
    }

    return null;
  }

  // 读取 json 的 fileName 内容
  function readJsonFile(directoryPath) {
    const packageJsonPath = findFilePath(directoryPath, fileName);
    const packageJson = {
      dependencies: {},
      devDependencies: {},
    };

    if (!packageJsonPath) {
      return packageJson;
    }

    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');

    try {
      const { dependencies, devDependencies } = JSON.parse(packageJsonContent);
      packageJson.dependencies = dependencies || {};
      packageJson.devDependencies = devDependencies || {};
    } catch (error) {
      console.error(
        `\n读取目录 ${directoryPath} 下的 ${fileName} 文件内容异常: `,
        error
      );
    }

    return packageJson;
  }

  // 读取 toml 的文件内容
  function readTomlFile(directoryPath) {
    const packageTomlPath = findFilePath(directoryPath, fileName);
    let packageToml = {};
    if (!packageTomlPath) {
      return packageToml;
    }

    packageToml = Toml.parse(fs.readFileSync(packageTomlPath, 'utf-8'));
    return packageToml;
  }

  function getTargetKeyInfo(directoryPath) {
    const result = {
      key: targetKey,
      value: '',
    };

    const rootHasFile = fs.existsSync(path.join(directoryPath, fileName));

    if (rootHasFile) {
      let fileJson = {};
      if (fileType === 'json') {
        fileJson = {
          ...readJsonFile(directoryPath)?.dependencies,
          ...readJsonFile(directoryPath)?.devDependencies,
        };
      }
      if (fileType === 'toml') {
        fileJson = readTomlFile(directoryPath);
      }

      try {
        const hasValue = fileJson[targetKey];
        if (hasValue) {
          result.value = hasValue;
        }
      } catch (error) {
        console.error(
          `\n读取目录 ${directoryPath} 下的 ${fileName} 文件内容异常: `,
          error
        );
      }
    }

    return result;
  }

  function updateProjectLint(repositories) {
    const result = [];
    for (const repositoryInfo of repositories) {
      const { name, web_url } = repositoryInfo;

      const repositoryPath = path.join(localAllReposCodePath, name);

      if (fs.existsSync(repositoryPath)) {
        const { key, value } = getTargetKeyInfo(repositoryPath);
        result.push({
          name,
          key,
          value,
          web_url,
        });
      }
    }

    return result;
  }

  async function main() {
    const allProjects = await loadFileList();
    console.log(`\n项目共有 ${allProjects.length} 个\n`);

    const result = updateProjectLint(allProjects);
    Tools.writeRes2SomePath('fileKeyInfos.json', result, resultPath);
  }

  await main();

  return {
    success: true,
  };
}

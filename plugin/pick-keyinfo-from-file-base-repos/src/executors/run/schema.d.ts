export interface RunExecutorSchema {
  "fileType": string; // 文件类型，支持 json toml格式
  "fileName": string; // 文件名
  "targetKey": string; // 找的字段名
  "localFileRepoListPath": string; // 项目清单
  "localAllReposCodePath": string; // 项目地址目录
  "resultPath": string;
} // eslint-disable-line

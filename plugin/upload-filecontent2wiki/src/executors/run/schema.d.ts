export interface RunExecutorSchema {
  "accessToken": string; // git仓库的accessToken
  "localJsonfilePath": string; // 要上传的json文件地址
  "gitLabBaseUrl": string;
  "uploadRepoId": number; // 要将结果上传到的仓库 id
} // eslint-disable-line

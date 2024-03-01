export interface RunExecutorSchema {
  accessToken: string,
  resultPath: string,
  gitLabBaseUrl: string,
  rootGroupId: number,
  ignoreGroupIds: number[],
  ignoreProjectsIds: number[],
  addRepoIds: number[],
  per_page: number
}

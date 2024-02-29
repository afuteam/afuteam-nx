// 假设 ignoreGroupIds, ignoreProjectsIds, addRepoIds 这些模块都导出了 number[] 类型的数据

import ignoreGroupIds from "./ignoreGroupIds";
import ignoreProjectsIds from "./ignoreProjectsIds";
import addRepoIds from "./addRepoIds";

interface GitLabConfig {
  gitLabBaseUrl: string;
  rootGroupId: number;
  uploadLintResRepoId: number;
  ignoreGroupIds: number[];
  ignoreProjectsIds: number[];
  addRepoIds: number[];
  page: number;
  per_page: number;
}

const GitLabConfigs: GitLabConfig = {
  gitLabBaseUrl: 'https://gitlab.com',
  rootGroupId: 80513252,
  uploadLintResRepoId: 500001,
  ignoreGroupIds,
  ignoreProjectsIds,
  addRepoIds,
  page: 1,
  per_page: 100
}

export default GitLabConfigs;


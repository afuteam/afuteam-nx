import { RunExecutorSchema } from './schema';
import * as fs from 'fs';
import Tools from './utils/index.js';
import axios from 'axios';

export default async function runExecutor(options: RunExecutorSchema) {
  console.log('\n@afuteam-nx/plugin-fetch-repos-branches插件执行', options);

  const {
    accessToken,
    localFileRepoListPath,
    resultPath,
    gitLabBaseUrl,
    per_page = 100,
  } = options;


  async function loadFileList() {
    const data = await fs.promises.readFile(
      `${localFileRepoListPath}`,
      "utf-8"
    );
    return JSON.parse(data);
  }

  async function getBranches(projectId: number, page = 1): Promise<any[]> {
    try {
      const response = await axios.get(
        `${gitLabBaseUrl}/api/v4/projects/${projectId}/repository/branches?per_page=${per_page}&page=${page}`,
        {
          headers: {
            'PRIVATE-TOKEN': accessToken,
          },
        }
      );

      const status = await response.status;
      if (status === 200) {
        let perPageData = await response.data;
        perPageData = perPageData.map(v => {
          const item = {
            branch_name: v.name,
            merged: v.merged,
            protected: v.protected,
            last_commit_id: v.commit.id,
            last_commit_title: v.commit?.title,
            last_committed_date: v.commit?.committed_date,
            last_committer_name: v.commit?.committer_name,
          }
          return item
        })
        if (perPageData.length === per_page) {
          return [
            ...perPageData,
            ...(await getBranches(projectId, page + 1)),
          ];
        }
        return perPageData;
      }

      return [];
    } catch (error) {
      console.error('Error occurred while fetching perPageData:', error.message);
      throw error;
    }

  }


  async function main() {
    const allProjects = await loadFileList();

    // const allProjects = [allProjects1[0]]
    const allRepoWithBranches = []

    if(allProjects && allProjects.length > 0) {
      console.log(`一共有 ${allProjects.length} 个项目要执行扫描...\n`);
      for(const project of allProjects) {
        const { id, name, default_branch, web_url} = project;

        const projectBranches = await getBranches(id, 1);

        const mergedBranches = projectBranches.filter(v => v.merged === true);
        // 筛选出大于3个月的
        const lastCommitDateIsValidBranches = projectBranches.filter(v => Tools.diffTimeFromNow(v.last_committed_date, 'month') > 2);
        const singleRepoInfo = {
          name,
          default_branch,
          repo_branches_link: web_url + '/branches',
          branches_names: projectBranches.map(v => v.branch_name).join(' & '),
          // branches: projectBranches,
          branches_count: projectBranches.length,
          // merged_branches: mergedBranches,
          merged_branches_count: mergedBranches.length,
          expired_branches_names: lastCommitDateIsValidBranches.map(v => v.branch_name).join(' & '),
          // expired_branches: lastCommitDateIsValidBranche,s
          expired_branches_count: lastCommitDateIsValidBranches.length
        }
        allRepoWithBranches.push(singleRepoInfo)

      }

      Tools.writeRes2SomePath('allReposBranchesInfo.json', allRepoWithBranches, resultPath)

    }

  }

  await main()

  return {
    success: true,
  };
}

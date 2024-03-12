import { RunExecutorSchema } from './schema';
import axios from 'axios';
import Tools from './utils/index.js';

interface Project {
  id: number;
  // ...其他属性
}

interface SubGroup {
  id: number;
}

export default async function runExecutor(options: RunExecutorSchema) {
  const {
    accessToken,
    resultPath,
    gitLabBaseUrl,
    rootGroupId,
    ignoreGroupIds,
    ignoreProjectsIds,
    addRepoIds,
    per_page = 100,
  } = options;

  // 获取指定 Group ID 下的所有 Projects
  async function getProjects(groupId: number, page = 1): Promise<Project[]> {
    try {
      const response = await axios.get(
        `${gitLabBaseUrl}/api/v4/groups/${groupId}/projects?per_page=${per_page}&page=${page}`,
        {
          headers: {
            'PRIVATE-TOKEN': accessToken,
          },
        }
      );

      const status = await response.status;

      if (status === 200) {
        const projects = (await response.data) as Project[];
        if (projects.length === per_page) {
          return [...projects, ...(await getProjects(groupId, page + 1))];
        }
        return projects;
      }
      return [];
    } catch (error) {
      console.error('Error occurred while fetching projects:', error.message);
      throw error;
    }
  }

  // 获取指定 Group ID 下的所有子 Group
  async function getSubGroups(groupId: number, page = 1): Promise<any[]> {
    try {
      const response = await axios.get(
        `${gitLabBaseUrl}/api/v4/groups/${groupId}/subgroups?per_page=${per_page}&page=${page}`,
        {
          headers: {
            'PRIVATE-TOKEN': accessToken,
          },
        }
      );

      const status = await response.status;
      if (status === 200) {
        const subGroups = (await response.data) as SubGroup[];
        // 排除 ignoreGroupIds
        const afterFilterSubGroups = subGroups.filter(
          ({ id }) => !ignoreGroupIds.includes(id)
        );
        if (subGroups.length === per_page) {
          return [
            ...afterFilterSubGroups,
            ...(await getSubGroups(groupId, page + 1)),
          ];
        }
        return afterFilterSubGroups;
      }

      return [];
    } catch (error) {
      console.error('Error occurred while fetching subgroups:', error.message);
      throw error;
    }
  }

  // 递归获取所有子 Group 下的 Projects，并提取所需字段
  async function getAllSubGroupProjects(groupId: number): Promise<Project[]> {
    try {
      const subProjects = await getProjects(groupId);
      const subGroups = await getSubGroups(groupId);

      // 使用 Promise.all 并行地获取每个子组的项目
      const subGroupProjectsPromises = subGroups.map((group) =>
        getAllSubGroupProjects(group.id)
      );
      const subGroupProjectsArrays = await Promise.all(
        subGroupProjectsPromises
      );

      // 将所有子组的项目合并成一个数组
      const allSubGroupProjects = [].concat(...subGroupProjectsArrays);

      // 合并本组和所有子组的项目
      return [...subProjects, ...allSubGroupProjects];
    } catch (error) {
      console.error('Error occurred while fetching projects:', error.message);
      throw error;
    }
  }

  // 获取指定 projectIds 的信息
  async function getProjectsByIds(ids: number[]): Promise<Project[]> {
    if (!ids || ids.length === 0) {
      return [];
    }
    try {
      const projects = await Promise.all(
        ids.map((repo_id) =>
          axios
            .get(`${gitLabBaseUrl}/api/v4/projects/${repo_id}`, {
              headers: { 'PRIVATE-TOKEN': accessToken },
            })
            .then((response) =>
              response.status === 200 ? response.data : null
            )
            .catch((err) => {
              console.error(
                `Error occurred while fetching project ${repo_id}:`,
                err.message
              );
              return null; // 如果请求失败，返回null
            })
        )
      );

      return projects.filter((project): project is Project => project !== null); // 过滤掉错误的请求结果
    } catch (error) {
      console.error(
        'Unexpected error occurred while fetching projects:',
        error.message
      );
      throw error;
    }
  }

  const main = async () => {
    try {
      const rootGroupIdProjectsInfos = await getAllSubGroupProjects(
        rootGroupId
      );
      const addProjectInfos = await getProjectsByIds(addRepoIds);

      const allProjectsMap = new Map<number, Project>();
      const allProjectsTempArr: Project[] = [
        ...rootGroupIdProjectsInfos,
        ...addProjectInfos,
      ];

      allProjectsTempArr.forEach((item) => allProjectsMap.set(item.id, item));
      const result = Array.from(allProjectsMap.values());

      const filteredResult = result.filter(
        (item) => !ignoreProjectsIds.includes(item.id)
      );

      console.log(`\n${new Date()} \n当前使用的token是 ${accessToken}\n 共有项目 ${filteredResult.length} 个`);

      Tools.writeRes2SomePath('allProjects.json', filteredResult, resultPath);

      return true;
    } catch (error) {
      console.error('Error occurred:', error.message);
      return false;
    }
  };

  const result = await main();
  return {
    success: result,
  };
}

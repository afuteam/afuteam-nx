# plugin-fetch-repos-branches

批量获取远程仓库的分支信息

## 环境
本插件基于 `nx` 开发，请在对应初始化好的 `your-app` 中使用

## 安装

```bash
pnpm i @afuteam-nx/plugin-fetch-repos-branches -D
```

## 配置
```bash
# 在 apps/your-app/project.json 中配置
"targets": {
  "fetch-repos": {
    "executor": "@afuteam-nx/plugin-fetch-repos-branches:run",
    "options": {
      "accessToken": "获取代码仓库的 accessToken",
      "localJsonfilePath": "要统计的项目清单 allProjects.json",
      "resultPath": "结果输出的位置 文件名 allReposBranchesInfo.json ",
      "gitLabBaseUrl": "git仓库地址，比如 https://gitlab.com",
      "per_page": "通过git api获取项目列表时，每次获取的数量，默认 100",
    }
  }
}

```

## 使用
```bash
nx run your-app:fetch-repos-branches
```

## 输出数据结构
`allProjects.json`

```json
[
  {
    "id": 13,
    "name": "sky",
    "default_branch": "master",
    "web_url": "https://gitlab.com/@afuteam/sky",
  }
]
```

`allReposBranchesInfo.json`

```json
  [
    {
      "name": "sky",
      "default_branch": "master",
      "repo_branches_link": "https://gitlab.com/@afuteam/branches",
      "branches_names": "brancha & branchb",
      "branches_count": 6,
      "merged_branches_count": 0,
      "expired_branches_names": "",
      "expired_branches_count": 0
    }

```


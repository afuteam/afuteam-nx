# plugin-fetch-repos

批量获取远程仓库信息，支持配置 groupId, projectid，以及黑白名单

## 环境
本插件基于 `nx` 开发，请在对应初始化好的 `your-app` 中使用

## 安装

```bash
pnpm i @afuteam-nx/plugin-fetch-repos -D
```

## 配置
```bash
# 在 apps/your-app/project.json 中配置
"targets": {
  "fetch-repos": {
    "executor": "@afuteam-nx/plugin-fetch-repos:run",
    "options": {
      "accessToken": "获取代码仓库的accessToken",
      "resultPath": "结果输出的位置 文件名 allProjects.json ",
      "gitLabBaseUrl": "git仓库地址，比如 https://gitlab.com",
      "rootGroupId": "仓库group类型的id 比如 4203",
      "ignoreGroupIds": "排除的group类型的id [1424, 12212]",
      "ignoreProjectsIds": "排除的project类型的id集合 [444, 0001]",
      "addRepoIds": "新增的project类型的id集合 [444, 0001]",
      "per_page": "通过git api获取项目列表时，每次获取的数量，默认 100",
    }
  }
}

```

## 使用
```bash
nx run your-app:fetch-repos
```

## 输出数据结构
```json
// allProjects.json
[
  {
    "id": 28612,
    "description": "@afuteam-nx 系列插件",
    "name": "plugins",
    "name_with_namespace": "",
    "path": "",
    "path_with_namespace": "",
    "created_at": "2023-11-21T15:23:21.637+08:00",
    "default_branch": "master",
    "tag_list": [],
    "ssh_url_to_repo": "",
    "http_url_to_repo": "",
    "web_url": "",
    "avatar_url": null,
    "star_count": 0,
    "forks_count": 0,
    "last_activity_at": "2024-03-05T20:49:03.274+08:00",
    "_links": {
      "self": "http://gitlab.com",
      "issues": "http://gitlab.com/issues",
      "merge_requests": "http://gitlab.com/merge_requests",
      "repo_branches": "http://gitlab.com/repository/branches",
      "labels": "http://gitlab.com/labels",
      "events": "http://gitlab.com/events",
      "members": "http://gitlab.com/members"
    },
    "archived": false,
    "visibility": "private",
    "resolve_outdated_diff_discussions": false,
    "container_registry_enabled": true,
    "issues_enabled": true,
    "merge_requests_enabled": true,
    "wiki_enabled": true,
    "jobs_enabled": true,
    "snippets_enabled": true,
    "shared_runners_enabled": false,
    "lfs_enabled": true,
    "creator_id": 943,
    "namespace": {
      "id": 4957,
      "name": "",
      "path": "",
      "kind": "group",
      "full_path": "",
      "parent_id": 4203
    },
    "import_status": "none",
    "open_issues_count": 0,
    "public_jobs": true,
    "ci_config_path": null,
    "shared_with_groups": [],
    "only_allow_merge_if_pipeline_succeeds": false,
    "request_access_enabled": false,
    "only_allow_merge_if_all_discussions_are_resolved": false,
    "printing_merge_request_link_enabled": true
  },
  // ... 其他项目
]
```


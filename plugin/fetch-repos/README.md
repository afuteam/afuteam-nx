# plugin-fetch-repos

批量获取远程仓库信息，支持配置 groupId, projectid，以及黑白名单

## 环境
本插件基于 `nx` 开发，请在对应初始化好的 `nx-workspace` 中使用

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
      "resultPath": "结果输出的位置",
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


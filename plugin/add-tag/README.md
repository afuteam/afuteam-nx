# plugin-add-tag

给指定日期前的最后一次提交打上标签，支持批量操作


## 环境
本插件基于 `nx` 开发，请在对应初始化好的 `your-app` 中使用；


## 安装

```bash
pnpm i @afuteam-nx/plugin-add-tag -D
```

## 配置
```bash
# 在 apps/your-app/project.json 中配置
"targets": {
  "fetch-repos": {
    "executor": "@afuteam-nx/plugin-add-tag:run",
    "options": {
      "accessToken": "你的github accessToken",
      "localFileRepoListPath": "从代码仓库拉下来的项目信息清单路径 allProjects.json",
      "date": "指定的日期 比如 2024-02-29，则是2024-02-29 00:00:00之前的",
      "tagName": "要打的标签名称",
      "gitLabBaseUrl": "本地代码仓库源码路径",
      "resultPath": "结果输出路径 文件名 allReposCreateTagResInfo.json"
    }
  }
}

```

## 使用
```bash
nx run your-app:add-tag
```

## 文件数据结构

`allProjects.json`
```json
[
  {
    "id": "",
    "name": "",
    "created_at": "",
    "last_activity_at": "",
    "name": "",
    "web_url": ""
  }
]
```


`allReposCreateTagResInfo.json`
```json
[
  {
    "id": 28328,
    "name": "GeoNexa",
    "tag_url": "https://gitlab.com/afu/add-tag/tags/月亮代表我的心",
    "addTagStatus": true,
    "addTagMessage": "",
    "created_at": "2023-10-16T20:06:37.644+08:00",
    "last_activity_at": "2024-03-14T17:32:00.264+08:00"
  }
]
```



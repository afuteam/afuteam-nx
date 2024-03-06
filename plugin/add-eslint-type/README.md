# plugin-add-eslint-type

给定代码仓库源码，智能识别代码仓库技术栈，输出仓库应当使用哪种 `AFUEslintType` 类型，进行代码质量检测。

## 环境
本插件基于 `nx` 开发，请在对应初始化好的 `your-app` 中使用；

本插件受益于 [@afuteam/eslint-plugin-fe](https://www.npmjs.com/package/@afuteam/eslint-plugin-fe) 提供代码 `AFUEslintType` 分析能力

## 安装

```bash
pnpm i @afuteam-nx/plugin-add-eslint-type -D
```

## 配置
```bash
# 在 apps/your-app/project.json 中配置
"targets": {
  "fetch-repos": {
    "executor": "@afuteam-nx/plugin-add-eslint-type:run",
    "options": {
      "localFileAllReposInfoPath": "从代码仓库拉下来的项目信息清单路径 allProjects.json",
      "blackFileList": "过滤文件目录名称",
      "localFilesAllReposCodePath": "本地代码仓库源码路径",
      "resultPath": "结果输出路径 文件名 allProjectsWithLinType.json"
    }
  }
}

```

## 使用
```bash
nx run your-app:add-eslint-type
```

## 文件数据结构

`allProjects.json`
```json
[
  {
    "id": "",
    "created_at": "",
    "last_activity_at": "",
    "name": "",
    "web_url": ""
  }
]
```


`allProjectsWithLinType.json`
```json
[
  {
    "id": 28612,
    "created_at": "2023-11-21T15:23:21.637+08:00",
    "last_activity_at": "2024-03-04T20:41:10.727+08:00",
    "name": "sky",
    "AFULintType": {
      "root": "react-ts"
    },
    "web_url": "https://gitlab.com/afuteam/sky"
  }
]
```



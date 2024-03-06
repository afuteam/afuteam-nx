# plugin-exec-eslint

对代码仓库执行代码质量检查，支持批量项目。
输出结果包含仓库的 `eslint错误数` `空行数` `代码行数` `注释行数`


## 环境
本插件基于 `nx` 开发，请在对应初始化好的 `your-app` 中使用

本插件的输入文件建议使用 [@afuteam-nx/plugin-add-eslint-type](https://www.npmjs.com/package/@afuteam-nx/plugin-add-eslint-type)生成的文件

本插件受益于 [@afuteam/eslint-plugin-fe](https://www.npmjs.com/package/@afuteam/eslint-plugin-fe) 提供代码 `eslint` 规则

## 安装

```bash
pnpm i @afuteam-nx/plugin-exec-eslint -D
```

## 配置
```bash
# 在 apps/your-app/project.json 中配置
"targets": {
  "fetch-repos": {
    "executor": "@afuteam-nx/plugin-exec-eslint:run",
    "options": {
      "localFileReposWithAFULintTypePath": "项目清单需要有 AFULintType 字段, allProjectsWithLinType.json",
      "localAllReposCodePath": "本地的要执行 eslint 源代码路径",
      "resultPath": "结果输出路径 文件名 allProjectsLintResult.json"
    }
  }
}

```

## 使用
```bash
nx run your-app:exec-eslint
```

## 文件数据结构
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

`allProjectsLintResult.json`
```json
[
  {
    "sky": {
      "errors": 0,
      "warnings": 0,
      "total": 0,
      "blankLines": 589,
      "commentLines": 378,
      "codeLines": 21295,
      "created_at": "2023-11-21T15:23:21.637+08:00",
      "last_activity_at": "2024-03-04T20:41:10.727+08:00",
      "id": 28669,
      "name": "sky"
    }
  }
]
```




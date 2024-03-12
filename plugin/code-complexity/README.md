# plugin-code-complexity

对代码仓库执行代码质量的复杂度检查，支持批量项目。


## 环境
本插件基于 `nx` 开发，请在对应初始化好的 `your-app` 中使用

本插件的输入文件建议使用 [@afuteam-nx/plugin-add-eslint-type](https://www.npmjs.com/package/@afuteam-nx/plugin-add-eslint-type) 生成的文件

本插件受益于 [@afuteam/eslint-plugin-fe](https://www.npmjs.com/package/@afuteam/eslint-plugin-fe) 提供代码 `complexity-without-switchcase` 规则，改规则基于 `complexity`，但忽略 `switch` 语句

## 安装

```bash
pnpm i @afuteam-nx/plugin-code-complexity -D
```

## 配置
```bash
# 在 apps/your-app/project.json 中配置
"targets": {
  "fetch-repos": {
    "executor": "@afuteam-nx/plugin-code-complexity:run",
    "options": {
      "localFileReposWithAFULintTypePath": "项目清单需要有 AFULintType 字段, allProjectsWithLinType.json",
      "localFilesAllReposCodePath": "本地的要执行 eslint 源代码路径",
      "resultPath": "结果输出路径 文件名 allProjectsWithCodeComplexity.json"
    }
  }
}

```

## 使用
```bash
nx run your-app:code-complexity
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

`allProjectsWithCodeComplexity.json`
```json
[
  {
    "id": 28005,
    "created_at": "2023-08-22T14:02:51.065+08:00",
    "last_activity_at": "2024-01-04T19:56:40.565+08:00",
    "name": "sky",
    "web_url": "https://gitlab.com/afuteam/sky",
    "complexityDataLength": 3,
    "complexityData": [
      {
        "ruleId": "@afuteam/fe/complexity-without-switchcase",
        "severity": 2,
        "message": "Generator method 'getCurrentAccount' has a complexity of 27. Maximum allowed is 20.",
        "line": 43,
        "column": 23,
        "nodeType": "FunctionExpression",
        "messageId": "@afuteam/fe/complexity-without-switchcase",
        "endLine": 77,
        "endColumn": 6
      },
      {
        "ruleId": "@afuteam/fe/complexity-without-switchcase",
        "severity": 2,
        "message": "Arrow function has a complexity of 22. Maximum allowed is 20.",
        "line": 22,
        "column": 49,
        "nodeType": "ArrowFunctionExpression",
        "messageId": "@afuteam/fe/complexity-without-switchcase",
        "endLine": 338,
        "endColumn": 2
      },
      {
        "ruleId": "@afuteam/fe/complexity-without-switchcase",
        "severity": 2,
        "message": "Arrow function has a complexity of 32. Maximum allowed is 20.",
        "line": 26,
        "column": 59,
        "nodeType": "ArrowFunctionExpression",
        "messageId": "@afuteam/fe/complexity-without-switchcase",
        "endLine": 450,
        "endColumn": 2
      }
    ]
  },
]
```




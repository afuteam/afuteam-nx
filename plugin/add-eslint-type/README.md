# plugin-add-eslint-type

给定代码仓库源码，智能识别代码仓库类型，以及输出应当使用哪种 `AFUEslintType` 类型 进行检测。

由 [@afuteam/eslint-plugin-fe](https://www.npmjs.com/package/@afuteam/eslint-plugin-fe) 提供代码 `AFUEslintType` 分析能力

## 环境
本插件基于 `nx` 开发，请在对应初始化好的 `nx-workspace` 中使用

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
      "localFileAllReposInfoPath": "从代码仓库拉下来的项目信息清单路径",
      "blackFileList": "过滤文件目录名称",
      "localFilesAllReposCodePath": "本地代码仓库源码路径",
      "resultPath": "结果输出路径"
    }
  }
}

```

## 使用
```bash
nx run your-app:add-eslint-type
```


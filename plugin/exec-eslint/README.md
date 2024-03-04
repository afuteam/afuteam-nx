# plugin-exec-eslint

对给定代码仓库和 `eslint` 类型 `AFULintType`，对项目执行代码质量检查。

基于 [@afuteam-nx/plugin-add-eslint-type](https://www.npmjs.com/package/@afuteam-nx/plugin-add-eslint-type) 提供的 `AFULintType` 字段，执行 `eslint` 检查

由 [@afuteam/eslint-plugin-fe](https://www.npmjs.com/package/@afuteam/eslint-plugin-fe) 提供代码 `eslint` 规则，也是 `@afuteam` 团队目前在使用的项目代码质量规范

## 环境
本插件基于 `nx` 开发，请在对应初始化好的 `nx-workspace` 中使用

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
      "localFileReposWithAFULintTypePath": "项目清单需要携带 AFULintType 字段",
      "localAllReposCodePath": "本地的要执行 eslint 源代码路径",
      "resultPath": "结果输出路径"
    }
  }
}

```

## 使用
```bash
nx run your-app:exec-eslint
```


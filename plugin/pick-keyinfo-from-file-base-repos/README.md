# plugin-pick-keyinfo-from-file-base-repos

批量统计团队代码仓库中配置文件是否有指定的配置，如 `package.json` 中是否有 依赖 `@afuteam/eslint-plugin-fe` 安装等
支持批量。

## 环境
本插件基于 `nx` 开发，请在对应初始化好的 `your-app` 中使用

## 安装

```bash
pnpm i @afuteam-nx/plugin-pick-keyinfo-from-file-base-repos -D
```

## 配置
```bash
# 在 apps/your-app/project.json 中配置
"targets": {
  "fetch-repos": {
    "executor": "@afuteam-nx/plugin-pick-keyinfo-from-file-base-repos:run",
    "options": {
        "fileType": "文件类型，目前支持 json toml格式",
        "fileName": "目标文件名 比如 package.json ",
        "targetKey": "想统计的字段，比如 @afuteam/eslint-plugin-fe ",
        "localFileRepoListPath": "本地代码清单 allProjects.json",
        "localAllReposCodePath": "本地代码仓库路径",
        "resultPath": "结果输出的路径，文件名为 fileKeyInfos.json"
    }
  }
}

```

## 使用
```bash
nx run your-app:pick-keyinfo-from-file-base-repos
```

## 文件数据结构
`allProjects.json`
```json
[
  {
    "name": "your-app",
    "web_url": "https://git.xxx.com/xxx/your-app"
  }
]
```

`fileKeyInfos.json`
```json
[
  {
    "name": "your-app",
    "key": "@afuteam/eslint-plugin-fe",
    "value": "2.0.6",
    "web_url": "https://git.xxx.com/afuteam/your-app"
  }
]
```




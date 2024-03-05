# plugin-fetch-remote-code

用于下载远程仓库的插件，支持多仓库。

## 环境
本插件基于 `nx` 开发，请在对应初始化好的 `nx-workspace` 中使用

## 安装

```bash
pnpm i @afuteam-nx/plugin-fetch-remote-code -D
```

## 配置
```bash
# 在 apps/your-app/project.json 中配置
"targets": {
  "fetch-repos": {
    "executor": "@afuteam-nx/plugin-fetch-remote-code:run",
    "options": {
      "localFileReposWithRemotePath": "本地需要下载的代码仓库清单",
      "localFilesDownLoadPath": "代码下载的本地文件夹地址"
    }
  }
}

```

## 使用
```bash
nx run your-app:fetch-remote-code
```


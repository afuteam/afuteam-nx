# plugin-downloadrepos

用于下载远程仓库的插件，支持批量下载。

## 环境
本插件基于 `nx` 开发，请在对应初始化好的 `your-app` 中使用

## 安装

```bash
pnpm i @afuteam-nx/plugin-downloadrepos -D
```

## 配置


```bash
# 在 apps/your-app/project.json 中配置
"targets": {
  "fetch-repos": {
    "executor": "@afuteam-nx/plugin-downloadrepos:run",
    "options": {
      "localFileReposWithRemotePath": "本地需要下载的代码仓库清单地址",
      "localFilesDownLoadPath": "代码下载的本地文件夹地址"
    }
  }
}

```

## 使用
```bash
nx run your-app:downloadrepos
```

## localFileReposWithRemotePath 文件数据结构
```json
// allProjects.json
[
  {
    "http_url_to_repo": "",
    "name": "plugins",
    "default_branch": "master",
    // ... 其他项目信息
  },
  // ... 其他项目
]
```


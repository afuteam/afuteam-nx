# plugin-upload-filecontent2wiki

将本地生成的文本类文件内容上传到指定仓库的 `wiki` 页面

## 环境
本插件基于 `nx` 开发，请在对应初始化好的 `nx-workspace` 中使用

## 安装

```bash
pnpm i @afuteam-nx/plugin-upload-filecontent2wiki -D
```

## 配置
```bash
# 在 apps/your-app/project.json 中配置
"targets": {
  "upload-filecontent2wiki": {
    "executor": "@afuteam-nx/plugin-upload-filecontent2wiki:run",
    "options": {
      "accessToken": "获取代码仓库的accessToken",
      "localJsonfilePath": "要上传的json文件地址",
      "gitLabBaseUrl": "git仓库地址，比如 https://gitlab.com",
      "uploadRepoId": "将结果上传到的仓库group类型的id 比如 4203"
    }
  }
}

```

## 使用
```bash
nx run your-app:upload-filecontent2wiki
```

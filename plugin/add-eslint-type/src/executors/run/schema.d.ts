// TODO 项目清单的单条 schema格式需要细化下
export interface RunExecutorSchema {
  localFileAllReposInfoPath: string, // 从代码仓库拉下来的项目信息清单路径
  blackFileList: string[], // 过滤文件目录名称
  localFilesAllReposCodePath: string, // 本地代码仓库源码路径
  resultPath: string, // 结果输出路径
} // eslint-disable-line

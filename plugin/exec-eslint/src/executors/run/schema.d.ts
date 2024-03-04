export interface RunExecutorSchema {
  "localFileReposWithAFULintTypePath": string, // 项目清单 带着 AFULintType 可以通过 @afuteam-nx/plugin-add-eslint-type 插件获得
  "localAllReposCodePath": string, // 本地的要执行 eslint 源代码路径
  "resultPath": string, // 结果输出路径
} // eslint-disable-line

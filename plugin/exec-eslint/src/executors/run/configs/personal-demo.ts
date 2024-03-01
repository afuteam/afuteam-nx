interface PersonalConfig {
  accessToken: string;
  allReposPath: string;
  lintResultPath: string;
}

const personal: PersonalConfig = {
  accessToken: '自己的accessToken',
  allReposPath: '要统计项目下载到本地的路径',
  lintResultPath: "结果存放的地方"
};

export default personal;

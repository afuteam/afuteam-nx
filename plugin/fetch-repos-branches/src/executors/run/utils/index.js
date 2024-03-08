import * as path from 'path';
import * as fs from 'fs';
import * as dayjs from 'dayjs';

function diffTimeFromNow(givenTime, unit='month') {
  let now = dayjs(); // 当前时间
  const givenTimeFormat = dayjs(givenTime); // 给定时间

  return now.diff(givenTimeFormat, unit); // 计算差值
}

function writeRes2SomePath(fileName, data, ResDirPath) {
  if (!ResDirPath) {
    console.error('结果路径没有配置，请检查');
    return;
  }
  // 目标文件夹路径
  const dirPath = ResDirPath;

  // 确保目标文件夹存在，如果不存在就创建它
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // 目标文件完整路径
  const filePath = path.join(dirPath, fileName);

  // 写入文件
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  console.log(`结果已写入到 ${filePath}`);
}

export default {
  writeRes2SomePath,
  diffTimeFromNow
};

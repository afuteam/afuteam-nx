import { RunExecutorSchema } from './schema';
import * as schedule from 'node-schedule';
import { exec } from 'child_process';

export default async function runExecutor(options: RunExecutorSchema) {
  console.log('Executor ran for Run', options);

  schedule.scheduleJob('* * * * *', function(){
    console.log('Running Nx plugin...');
    exec('nx run afuteam-nx:my-echo', (err, stdout, stderr) => {
      if (err) {
        console.log('node error')
        // node couldn't execute the command
        return;
      }

      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
  });

  // Add an infinite loop here
  // eslint-disable-next-line no-constant-condition
  while (true) {
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  return {
    success: true,
  };
}

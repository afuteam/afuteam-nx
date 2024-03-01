import { RunExecutorSchema } from './schema';

export default async function runExecutor(options: RunExecutorSchema) {
  console.log('eyea \n wow Executor ran for Run', options);
  return {
    success: true,
  };
}

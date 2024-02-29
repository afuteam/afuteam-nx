import { MyExecutorExecutorSchema } from './schema';

export default async function runExecutor(options: MyExecutorExecutorSchema) {
  console.log('Executor ran for MyExecutor', options);
  return {
    success: true,
  };
}

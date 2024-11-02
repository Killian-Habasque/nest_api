import * as fs from 'node:fs';

export default () => ({
  isGlobal: true,
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    name: process.env.DATABASE_NAME || 'nest',
    username: process.env.DATABASE_USERNAME || 'nest',
    password: process.env.DATABASE_PASSWORD || 'password',
  },
});
export const loadEnvironment = (env?: string): string | string[] => {
  if (!env) {
    return '.env';
  }

  const file = `${process.cwd()}/config/environment/${process.env.NODE_ENV}.env`;
  if (!fs.existsSync(file)) {
    return '.env';
  }

  const envFiles: string[] = [];
  envFiles.push(file);
  if (fs.existsSync(`${file}.local`)) {
    envFiles.unshift(`${file}.local`);
  }

  return envFiles;
};

import { DIRECTORIES, FILES } from '~/constants/files';
import { getPathAsync } from './paths';
import fs from 'fs';

export const checkFiles = async () => {
  for (const dir of DIRECTORIES) {
    const path = await getPathAsync(dir) ?? '';
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  }

  Object.keys(FILES).forEach(async (key) => {
    const defaultContent = (FILES as any)[key];
    const path = await getPathAsync(key) ?? '';

    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, JSON.stringify(defaultContent));
    }
  });
};

export const pathExists = (path: string) => {
  return new Promise((resolve) => {
    fs.stat(path, (error) => {
      resolve(!error);
    });
  });
};
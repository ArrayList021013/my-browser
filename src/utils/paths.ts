import { resolve } from 'path';
import { app } from 'electron';

export const getPathAsync = async (...relativePaths: string[]) => {
  const path = await window.electronAPI.getUserDataPath();
  if (path) {
    console.log('User Data Path: ', path);
    return path;
  } else {
    console.error('Could not get user data path');
    return null;
  }

  return resolve(path, ...relativePaths).replace(/\\/g, '/');
};
// 检查当前目录是否存在 node_modules

// import { fs } from './zx/build/index.mjs';

const isExistNodeModules = (path) => {
  return fs.readdirSync(path).includes('node_modules');
};

export { isExistNodeModules };

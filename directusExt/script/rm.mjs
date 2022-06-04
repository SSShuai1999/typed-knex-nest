#! /usr/bin/env node

// import { $, fs } from './zx/build/index.mjs';

const extensionsFloderPath = './src/directus/extensions/';
const endpointsFloderPath = extensionsFloderPath + 'endpoints';

// 寻找 extenions 目录下的所有 endpoints 文件
const allPoints = fs
  .readdirSync(endpointsFloderPath)
  .filter((item) => !['.DS_Store', 'test'].includes(item));

for (const item of allPoints) {
  try {
    await $`cd ${endpointsFloderPath}/${item} && rm -rf ./node_modules`;
  } catch (e) {}
}

console.log('install Done!!!');

export {};

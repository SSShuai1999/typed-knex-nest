#! /usr/bin/env node

// import { $, fs } from './zx/build/index.mjs';

// directus -> endpoints 服务目录
const directus_ExtensionsFloderPath = '../extensions/endpoints';

// directusExt -> directusDist 编译好的目录
const directusExt_directusDistFloderPath = './directusDist/';

// 先进入目标目录，然后删除所有文件
// FIXME 20220419 优化 没有同级目录不执行
if (fs.existsSync(directus_ExtensionsFloderPath)) {
  try {
    await $`cd ${directus_ExtensionsFloderPath} && rm -rf *`;
    await $`cp -r ${directusExt_directusDistFloderPath}. ${directus_ExtensionsFloderPath}`;
  } catch (e) {}
}

export {};

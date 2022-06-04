#! /usr/bin/env node

// import { $, fs } from './zx/build/index.mjs';

const zodFloderPath = './src/schema/zod/';

// 寻找 zod 目录下的所有文件夹
const allZodFloder = fs
  .readdirSync(zodFloderPath)
  .filter((item) => !['.DS_Store', 'test'].includes(item));

for (const item of allZodFloder) {
  const itemZodFilePath = `${zodFloderPath}${item}`;
  const sitemZodFile = fs
    .readdirSync(itemZodFilePath)
    // .filter(item => !(item.includes('.zod.ts')));
    .filter((item) => item.includes('index.ts'));

  for (const ssitemPath of sitemZodFile) {
    const ssItemZodFilePath = `${zodFloderPath}${item}/${ssitemPath}`;
    const targetPath = ssItemZodFilePath.split('.ts')[0] + '.zod.ts';

    await $`yarn ts-to-zod ${ssItemZodFilePath} ${targetPath}`;
  }
}

export {};

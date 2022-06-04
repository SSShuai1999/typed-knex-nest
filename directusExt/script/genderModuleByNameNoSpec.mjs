#! /usr/bin/env node

// import { $ } from './zx/build/index.mjs';

const inquirer = require('inquirer');

var questions = [
  {
    type: 'input',
    name: 'moduleName',
    message: '请输入模块名',
  },
];

inquirer.prompt(questions).then(async (answers) => {
  const moduleBase = './modules/';
  const moduleName = moduleBase + answers['moduleName'];

  await $`nest g module ${moduleName} --no-spec`;
  await $`nest g service ${moduleName} --no-spec`;
  await $`nest g controller ${moduleName} --no-spec`;
});

export {};

const extensionsFloderPath = './extensions/';

const endpointFloderPath = './endpoint/';

$`cd ${endpointFloderPath}&& npm run build`;

// const endpointsFloderPath = extensionsFloderPath + 'endpoints';
//
// // 寻找 extenions 目录下的所有 endpoints 文件
// const allPoints = fs.readdirSync(endpointsFloderPath)
//                     .filter(item => !(['.DS_Store'].includes(item)));
//
// for (let item of allPoints) {
//   await $`cd ${endpointsFloderPath}/${item} && npm run build`;
// }
    
console.log('Build Done!!!');

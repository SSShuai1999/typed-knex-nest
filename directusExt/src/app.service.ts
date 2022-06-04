import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      Nest + Knex 本地测试环境！
      可以输入对应的接口路径进行测试。
    `;
  }
}

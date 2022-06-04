import { InjectKnex, Knex } from 'nestjs-knex';
import { Injectable } from '@nestjs/common';
import type { TypedKnex } from '@wwwouter/typed-knex';

import { createTypedKnexIns } from '../../helper';
import {
  checkExcelImport$B,
} from './index.business';

@Injectable()
export class BomService {
  typedKnexIns: TypedKnex;

  constructor(@InjectKnex() private readonly knex: Knex) {
    this.typedKnexIns = createTypedKnexIns(this.knex);
  }
  // 检查 Excel 导入数据
  async checkExcelImport(body: any) {
    return await checkExcelImport$B(this.typedKnexIns, body);
  }
}

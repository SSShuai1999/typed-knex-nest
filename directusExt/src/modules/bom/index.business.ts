import type { TypedKnex } from '@wwwouter/typed-knex';
import {
  HttpCodeStatus,
  HttpMsgStatus,
  HttpStatus,
} from '../../constants/enum';
import { HttpRetError, HttpRetStruct } from '../../constants/httpStatus';
import {
  checkZodParamsIsSafe,
  parseZodErrorSchema,
} from '../../helper';
import {
  commonFilterFirst,
} from '../../knex/common';
import {
  Bom,
} from '../../schema';
import * as _ from 'lodash';
import {
  excelImportCheckZodParamsSchema,
} from './index.zod';
import type { z } from 'zod';

// excel 导入校验
export const checkExcelImport$B = async (
  kx: TypedKnex,
  body: z.infer<typeof excelImportCheckZodParamsSchema>,
) => {
  const parserMsg = excelImportCheckZodParamsSchema.safeParse(body);

  if (!checkZodParamsIsSafe(parserMsg)) {
    return HttpRetError(HttpCodeStatus.BAD_REQUEST, parseZodErrorSchema(parserMsg));
  }

  try {
    const res = await commonFilterFirst(kx.query(Bom), {
      id_matl: {
        where: ['=', 1],
      },
    });

    return HttpRetStruct({
      code: HttpStatus.OK,
      message: HttpMsgStatus.OK,
      data: res,
    });
  } catch (e) {
    console.log(e);
    return HttpRetError(HttpCodeStatus.BAD_REQUEST);
  }
};


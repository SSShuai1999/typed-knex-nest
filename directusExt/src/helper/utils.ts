import type { Knex } from 'knex';
import type { SafeParseError, z } from 'zod';
import { ITypedQueryBuilder, TypedKnex } from '@wwwouter/typed-knex';
import type { CQB, QT, RemoveObjectsFrom } from '../typings';
import { isArray, isNull, isUndefined } from './is';
import { GenerateCodeType } from '../constants/enum';
import * as moment from 'moment';
import { commonFilterFirst } from '../knex/common';
import { PlanDeliver, PlanVehicle } from '../schema';

export const wrapToArray = <T>(s: T | T[]): T[] => {
  if (isArray(s)) {
    return s as T[];
  } else {
    return [s as T];
  }
};

// 判断是否跳过空检查
export const checkIsSkipNullCheck = (value: any, data: any) => {
  if (!value) {
    return data;
  }

  const weakCopyData = data;
  const dataKeys = Object.keys(data);

  for (const item of dataKeys) {
    if ((isNull(data[item]) || isUndefined(data[item])) && !value.includes(item)) {
      delete weakCopyData[item];
    }
  }

  return weakCopyData;
};

// 检查 kx 是否是 TypedKnex 的实例
export const checkTypedKnexOrCustom = <A>(kx: TypedKnex | QT<A>): kx is TypedKnex => {
  if (kx instanceof TypedKnex) {
    return true;
  } else {
    return false;
  }
};

// 根据 KxConfig 获取对应的 TableQT [transaction 和 query]
export const getTableQTByKxConfig = async <A, T>(
  kx: TypedKnex | QT<A>,
  tableClass: new () => T,
) => {
  let query = null as any;
  let transaction = null as any;

  if (checkTypedKnexOrCustom<A>(kx)) {
    transaction = await kx.beginTransaction();
    query = kx.query(tableClass).transacting(transaction);
  } else {
    transaction = kx.transaction;
    query = kx.query.transacting(transaction);
  }

  return {
    query: query as CQB<T>,
    transaction: transaction as Knex.Transaction<any, any[]>,
  };
};

// 捕捉 Zod 错误
export const catchZodSafeParseError = <A>(parserMsg: z.SafeParseError<A>) => {
  try {
    const formatError = parserMsg.error.format();

    return formatError._errors[0];
  } catch (err) {
    return `UNKNOW_ERROR : ${err}`;
  }
};

// 捕捉 Zod 错误2
export const catchZodSafeParseError2 = <A>(parserMsg: z.SafeParseError<A>) => {
  try {
    const errorKey = parserMsg.error.issues[0].path[1];
    const errorMsg = parserMsg.error.issues[0].message;

    if (isUndefined(errorKey)) {
      const formatErr = parserMsg.error.format();
      const findFirstErrorKey = Object.keys(formatErr)
        .filter((item) => !['_errors'].includes(item))
        //@ts-expect-error
        .find((item) => formatErr[item]._errors.length > 0);

      return `${findFirstErrorKey} : ${
        //@ts-expect-error
        formatErr[findFirstErrorKey!]._errors[0]
      }`;
    } else {
      return `${errorKey} : ${errorMsg}`;
    }
  } catch (err) {
    return '没有具体的错误提示';
  }
};

// 返回通用的 ZOD 提示错误信息
export const commonIRError = (key: string) => {
  return {
    invalid_type_error: `${key} 参数错误`,
    required_error: `${key} 是必填的`,
  };
};

export const parseZodErrorSchema = <I>(parserMsg: SafeParseError<I>) => {
  const zodErrors = parserMsg.error.errors;
  const errors = {} as any;

  for (; zodErrors.length; ) {
    const error = zodErrors[0];
    const { code, message, path } = error;
    const _path = path.join('.');

    if (!errors[_path]) {
      if ('unionErrors' in error) {
        const unionError = error.unionErrors[0].errors[0];

        errors[_path] = {
          message: unionError.message,
          type: unionError.code,
        };
      } else {
        errors[_path] = { message, type: code };
      }
    }

    if ('unionErrors' in error) {
      error.unionErrors.forEach((unionError) =>
        unionError.errors.forEach((e) => zodErrors.push(e)),
      );
    }
    zodErrors.shift();
  }

  console.log(errors);

  try {
    for (const ek in errors) {
      if (ek.includes('0.')) {
        const ekStr = ek.split('0.')[1];
        const errorLine = ekStr.split('.').reduce((c, n) => `${c} -> ${n}`);
        const msg = errors[ek].message as string;

        if (msg) {
          return `${errorLine} : ${msg}`;
        }
      } else {
        const msg = errors[''].message as string;

        if (msg) {
          return `'' : ${msg}`;
        }
      }
    }
  } catch (e) {
    const keys = Object.keys(errors);

    if (errors[keys[0]]) {
      return `${keys[0]} : ${errors[keys[0]]['message']}`;
    }
  }
};

export const clearQueryColumnAlias = <A>(
  query: ITypedQueryBuilder<A, A, A>,
  column: Partial<RemoveObjectsFrom<A>>,
) => {
  try {
    for (const i in column) {
      const key = i;

      const alias = query.getColumnAlias(key as any);

      const fixAlias = alias.split('.')[1].slice(1, -1);
      if (key !== fixAlias) {
        //@ts-expect-error
        column[fixAlias] = column[key];
        //@ts-expect-error
        delete column[key];
      }
    }

    return column;
  } catch (e) {
    let qcolumns = {} as any;
    query.columns.forEach((item) => {
      qcolumns[item.name] = null;
    });

    return qcolumns;
  }
};

export const generateCode = async (
  kx: TypedKnex,
  generateCodetype: GenerateCodeType,
  cdeWhsePort: string,
  config: {
    transaction: Knex.Transaction<any, any[]>;
  },
) => {
  try {
    let code = '';
    //@ts-expect-error
    let date = (moment.default || moment)?.().format('YYMMDD');
    let q:
      | ITypedQueryBuilder<PlanDeliver, PlanDeliver, PlanDeliver>
      | ITypedQueryBuilder<PlanVehicle, PlanVehicle, PlanVehicle>;

    switch (generateCodetype) {
      case GenerateCodeType.FHJH:
        code += 'F';
        q = kx.query(PlanDeliver);
        break;
      case GenerateCodeType.PCJH:
        code += 'P';
        q = kx.query(PlanVehicle);
        break;
      default:
        throw new Error('生成类型必传');
    }

    let { count: query_count } = (await commonFilterFirst(
      q
        .transacting(config.transaction)
        .useKnexQueryBuilder((queryBuilder) => queryBuilder.forUpdate())
        //@ts-expect-error
        .count('id', 'count') as ITypedQueryBuilder<any, any, any>,
      {
        cde_whse_port: {
          where: ['=', cdeWhsePort],
        },
        date_created: {
          whereBetween: [
            //@ts-expect-error
            (moment.default || moment)?.().format('YYYY-MM-DD') + ' 00:00:00',
            //@ts-expect-error
            (moment.default || moment)?.().format('YYYY-MM-DD') + ' 23:59:59',
          ],
        },
      },
    )) as any;

    query_count += 1;
    if (query_count < 10) {
      query_count = '000' + query_count;
    } else if (query_count < 100) {
      query_count = '00' + query_count;
    } else if (query_count < 10) {
      query_count = '0' + query_count;
    }

    code += date;
    code += cdeWhsePort;
    code += query_count;

    return code;
  } catch (err) {
    throw new Error(err as any);
  }
};

export const undefinedToNull = (data: any) => {
  let copyData = {} as any;

  for (let item in data) {
    if (isUndefined(data[item])) {
      copyData[item] = null;
    } else {
      copyData[item] = data[item];
    }
  }

  return copyData;
};


export const fillLimitAndPageParameters = (self: CQB<any>, { limit, page }: { limit?: number, page?: number }) => {
  if (limit) {
    self.limit(limit);

    if (page) {
      self.offset((page - 1) * limit);
    }
  }

  return self;
};

import type { ITypedQueryBuilder } from '@wwwouter/typed-knex';

import type { CommonFilterConfig, CQB, FilterPRFNumberColumnsByTable, PRF } from '../../typings';
import { isNull, isUndefined } from '../../helper';

const safeList = <T>(list: T[]): T[] => {
  return list?.filter((item) => item) ?? [];
};

export const commonFilter = async <A, B, C>(
  query: ITypedQueryBuilder<A, B, C>,
  config: CommonFilterConfig<A>,
) => {
  const propertyColumns = Object.keys(config);
  let reduceQuery = query;

  try {
    propertyColumns.forEach((cl) => {
      //@ts-expect-error
      const queryMethods = Object.keys(config[cl]);
      queryMethods.forEach((methods) => {
        if (methods === 'where') {
          //@ts-expect-error
          const [l, r] = config[cl][methods];
          if (isUndefined(r) || isNull(r)) return;
          reduceQuery = reduceQuery[methods](cl as any, l, r);
        } else if (methods === 'whereLike') {
          //@ts-expect-error
          const [m, r] = config[cl][methods];
          if (isUndefined(m) || isNull(m)) return;
          const str = r === '%_%' ? `%${m}%` : r === '%_' ? `%${m}` : `${m}%`;
          reduceQuery = reduceQuery['where'](cl as any, 'like', str);
        } else if (methods === 'andWhere') {
          //@ts-expect-error
          const [l, r] = config[cl][methods];
          if (isUndefined(r) || isNull(r)) return;
          reduceQuery = reduceQuery[methods](cl as any, l, r);
        } else if (methods === 'orWhere') {
          //@ts-expect-error
          const [l, r] = config[cl][methods];
          if (isUndefined(r) || isNull(r)) return;
          reduceQuery = reduceQuery[methods](cl as any, l, r);
        } else if (methods === 'whereNull') {
          //@ts-expect-error
          const isCheck = config[cl][methods];
          if (!isCheck) return;
          reduceQuery = reduceQuery[methods](cl as any);
        } else if (methods === 'whereNotNull') {
          //@ts-expect-error
          const isCheck = config[cl][methods];
          if (!isCheck) return;
          reduceQuery = reduceQuery[methods](cl as any);
        } else if (methods === 'whereIn') {
          //@ts-expect-error
          const list = config[cl][methods];
          reduceQuery = reduceQuery[methods](cl as any, safeList(list));
        } else if (methods === 'whereNotIn') {
          //@ts-expect-error
          const list = config[cl][methods];
          reduceQuery = reduceQuery[methods](cl as any, safeList(list));
        } else if (methods === 'orWhereIn') {
          //@ts-expect-error
          const list = config[cl][methods];
          reduceQuery = reduceQuery[methods](cl as any, safeList(list));
        } else if (methods === 'orWhereNotIn') {
          //@ts-expect-error
          const list = config[cl][methods];
          reduceQuery = reduceQuery[methods](cl as any, safeList(list));
        } else if (methods === 'whereBetween') {
          //@ts-expect-error
          const list = config[cl][methods];
          if (!list[0] || !list[1]) return;
          reduceQuery = reduceQuery[methods](cl as any, list);
        } else if (methods === 'whereNotBetween') {
          //@ts-expect-error
          const list = config[cl][methods];
          if (!list[0] || !list[1]) return;
          reduceQuery = reduceQuery[methods](cl as any, list);
        } else if (methods === 'orWhereBetween') {
          //@ts-expect-error
          const list = config[cl][methods];
          if (!list[0] || !list[1]) return;
          reduceQuery = reduceQuery[methods](cl as any, list);
        } else if (methods === 'orWhereNotBetween') {
          //@ts-expect-error
          const list = config[cl][methods];
          if (!list[0] || !list[1]) return;
          reduceQuery = reduceQuery[methods](cl as any, list);
        } else {
          throw new Error('暂时还没有找到对应的查询方法，请联系 SSShuai1999 进行补充！');
        }
      });
    });

    return await reduceQuery.getMany();
  } catch (err) {
    // console.log('查询格式有误');
    throw new Error(err as any);
  }
};

export const commonFilterFirst = async <A, B, C>(
  query: ITypedQueryBuilder<A, B, C>,
  config: CommonFilterConfig<A>,
) => {
  const propertyColumns = Object.keys(config);
  let reduceQuery = query;

  try {
    propertyColumns.forEach((cl) => {
      //@ts-expect-error
      const queryMethods = Object.keys(config[cl]);
      queryMethods.forEach((methods) => {
        if (methods === 'where') {
          //@ts-expect-error
          const [l, r] = config[cl][methods];
          if (!r) return;
          reduceQuery = reduceQuery[methods](cl as any, l, r);
        } else if (methods === 'whereLike') {
          //@ts-expect-error
          const [m, r] = config[cl][methods];
          if (!m) return;
          const str = r === '%_%' ? `%${m}%` : r === '%_' ? `%${m}` : `${m}%`;
          reduceQuery = reduceQuery['where'](cl as any, 'like', str);
        } else if (methods === 'andWhere') {
          //@ts-expect-error
          const [l, r] = config[cl][methods];
          if (!r) return;
          reduceQuery = reduceQuery[methods](cl as any, l, r);
        } else if (methods === 'orWhere') {
          //@ts-expect-error
          const [l, r] = config[cl][methods];
          if (!r) return;
          reduceQuery = reduceQuery[methods](cl as any, l, r);
        } else if (methods === 'whereNull') {
          //@ts-expect-error
          const isCheck = config[cl][methods];
          if (!isCheck) return;
          reduceQuery = reduceQuery[methods](cl as any);
        } else if (methods === 'whereNotNull') {
          //@ts-expect-error
          const isCheck = config[cl][methods];
          if (!isCheck) return;
          reduceQuery = reduceQuery[methods](cl as any);
        } else if (methods === 'whereIn') {
          //@ts-expect-error
          const list = config[cl][methods];
          reduceQuery = reduceQuery[methods](cl as any, safeList(list));
        } else if (methods === 'whereNotIn') {
          //@ts-expect-error
          const list = config[cl][methods];
          reduceQuery = reduceQuery[methods](cl as any, safeList(list));
        } else if (methods === 'orWhereIn') {
          //@ts-expect-error
          const list = config[cl][methods];
          reduceQuery = reduceQuery[methods](cl as any, safeList(list));
        } else if (methods === 'orWhereNotIn') {
          //@ts-expect-error
          const list = config[cl][methods];
          reduceQuery = reduceQuery[methods](cl as any, safeList(list));
        } else if (methods === 'whereBetween') {
          //@ts-expect-error
          const list = config[cl][methods];
          if (!list[0] || !list[1]) return;
          reduceQuery = reduceQuery[methods](cl as any, list);
        } else if (methods === 'whereNotBetween') {
          //@ts-expect-error
          const list = config[cl][methods];
          if (!list[0] || !list[1]) return;
          reduceQuery = reduceQuery[methods](cl as any, list);
        } else if (methods === 'orWhereBetween') {
          //@ts-expect-error
          const list = config[cl][methods];
          if (!list[0] || !list[1]) return;
          reduceQuery = reduceQuery[methods](cl as any, list);
        } else if (methods === 'orWhereNotBetween') {
          //@ts-expect-error
          const list = config[cl][methods];
          if (!list[0] || !list[1]) return;
          reduceQuery = reduceQuery[methods](cl as any, list);
        } else {
          throw new Error('暂时还没有找到对应的查询方法，请联系 SSShuai1999 进行补充！');
        }
      });
    });

    console.log('reduceQuery >>> ', reduceQuery.toQuery());

    return await reduceQuery.getFirstOrNull();
  } catch (err) {
    console.log(err);
    throw new Error(err as any);
  }
};

export const commonWhereInFilter = async <A, B extends keyof PRF<A>>(
  query: ITypedQueryBuilder<A, A, A>,
  tokenKey: B,
  list: A[B][],
) => {
  return await commonFilter(
    query,
    // @ts-expect-error
    {
      [tokenKey]: {
        whereIn: list,
      },
    },
  );
};

// 查询 like
export const commonWhereLikeFilter = async <A, B extends keyof PRF<A>>(
  query: ITypedQueryBuilder<A, A, A>,
  tokenKey: B,
  value: A[B],
) => {
  return await commonFilter(
    query.clearWhere(),
    // @ts-expect-error
    {
      [tokenKey]: {
        where: ['like', value],
      },
    },
  );
};

// 查询 likeList
export const commonWherelikeListFilter = async <A, B extends keyof PRF<A>>(
  query: ITypedQueryBuilder<A, A, A>,
  tokenKey: B,
  value: A[B][],
) => {
  const result = [] as any[];

  for (const item of value) {
    const res = await commonWhereLikeFilter(query.clearWhere(), tokenKey, item);

    result.push(res);
  }

  return result;
};

/**
  Filter Operators =, !=, <=, >=, <, >
 */

// 查询 = 某个值
export const commonWhereEqFilter = async <A, B extends keyof PRF<A>>(
  query: ITypedQueryBuilder<A, A, A>,
  tokenKey: B,
  value: A[B],
) => {
  return await commonFilter(
    query,
    // @ts-expect-error
    {
      [tokenKey]: {
        where: ['=', value],
      },
    },
  );
};

// 查询 != 某个值
export const commonWhereNEqFilter = async <A, B extends keyof PRF<A>>(
  query: ITypedQueryBuilder<A, A, A>,
  tokenKey: B,
  value: A[B],
) => {
  return await commonFilter(
    query,
    // @ts-expect-error
    {
      [tokenKey]: {
        where: ['!=', value],
      },
    },
  );
};

// 查询 < 某个值
export const commonWhereLTFilter = async <A, B extends keyof FilterPRFNumberColumnsByTable<A>>(
  query: ITypedQueryBuilder<A, A, A>,
  tokenKey: B,
  value: A[B],
) => {
  return await commonFilter(
    query,
    // @ts-expect-error
    {
      [tokenKey]: {
        where: ['<', value],
      },
    },
  );
};

// 查询 <= 某个值
export const commonWhereLTEFilter = async <A, B extends keyof FilterPRFNumberColumnsByTable<A>>(
  query: ITypedQueryBuilder<A, A, A>,
  tokenKey: B,
  value: A[B],
) => {
  return await commonFilter(
    query,
    // @ts-expect-error
    {
      [tokenKey]: {
        where: ['<=', value],
      },
    },
  );
};

// 查询 > 某个值
export const commonWhereGTFilter = async <A, B extends keyof FilterPRFNumberColumnsByTable<A>>(
  query: ITypedQueryBuilder<A, A, A>,
  tokenKey: B,
  value: A[B],
) => {
  return await commonFilter(
    query,
    // @ts-expect-error
    {
      [tokenKey]: {
        where: ['>', value],
      },
    },
  );
};

// 查询 >= 某个值
export const commonWhereGTEFilter = async <A, B extends keyof FilterPRFNumberColumnsByTable<A>>(
  query: ITypedQueryBuilder<A, A, A>,
  tokenKey: B,
  value: A[B],
) => {
  return await commonFilter(
    query,
    // @ts-expect-error
    {
      [tokenKey]: {
        where: ['>=', value],
      },
    },
  );
};

// 获取某个表下面所有的数据
export const findAll = async <A>(query: CQB<A>) => {
  return await query.getMany();
};

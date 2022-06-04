import type { ITypedQueryBuilder } from '@wwwouter/typed-knex';
import type { NonNullableRecursive } from '@wwwouter/typed-knex/dist/src/NonNullableRecursive';
import type { NestedKeysOf } from '@wwwouter/typed-knex/dist/src/NestedKeysOf';

import {
  checkIsSkipNullCheck,
  clearQueryColumnAlias,
  isArray,
  undefinedToNull,
} from '../../helper';
import type { PRF, RemoveObjectsFrom } from '../../typings';
import type { GetNestedPropertyType } from '@wwwouter/typed-knex/dist/src/PropertyTypes';

export type UpdateItemsByPrimaryKeyItems<A> = {
  primaryKeyValue: any;
  data: Partial<RemoveObjectsFrom<A>>;
};

export const updateItemsByKey = async <
  A,
  B,
  C,
  D extends NestedKeysOf<NonNullableRecursive<A>, keyof NonNullableRecursive<A>, ''>,
>(
  query: ITypedQueryBuilder<A, B, C>,
  key: D,
  values: GetNestedPropertyType<A, D>[],
  data: PRF<A> | PRF<A>[],
  config: {
    /**
     * 如果传过来的数据字段为空，我们默认不更新
     * true = 不更新；false = 更新；
     */
    isSkipNullCheckMap?: string[];
  } = {},
) => {
  try {
    const resList = [] as any[];

    if (!values.length) {
      return resList;
    }

    if (isArray(data)) {
      if (values.length === data.length) {
        for (const idx in values) {
          const k = values[idx];
          const v = undefinedToNull(data[idx]);

          // 检查跳过哪些空字段
          const weakCopyData = checkIsSkipNullCheck(config.isSkipNullCheckMap, v);

          const res = await query
            .clearWhere()
            .where(key as any, k)
            .useKnexQueryBuilder((sub) =>
              sub.update(clearQueryColumnAlias(query as any, weakCopyData)),
            )
            .getMany();

          resList.push(res);
        }

        return resList;
      } else {
        throw new Error('更新的 key 数组和 values 数组不一致');
      }
    } else {
      const weakCopyData = checkIsSkipNullCheck(config.isSkipNullCheckMap, undefinedToNull(data));

      const res = await query
        .clearWhere()
        .whereIn(key as any, values)
        .useKnexQueryBuilder((sub) => sub.update(clearQueryColumnAlias(query as any, weakCopyData)))
        .getMany();

      resList.push(res);

      return resList;
    }
  } catch (err) {
    console.log('错误捕捉 >>> ', err);
    throw new Error(err as any);
  }
};

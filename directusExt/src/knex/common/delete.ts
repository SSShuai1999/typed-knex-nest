import type { ITypedQueryBuilder } from '@wwwouter/typed-knex';

/** 根据 ids 批量删除 */
export const delItemsByIds = async <A>(
  query: ITypedQueryBuilder<A, A, A>,
  ids: number[] | string[],
) => {
  try {
    return await query.useKnexQueryBuilder(async (queryBuilder) => {
      return await queryBuilder.whereIn('id', ids).del();
    });
  } catch (err) {
    throw new Error(err as any);
  }
};

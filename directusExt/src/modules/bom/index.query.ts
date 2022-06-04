import { commonWhereInFilter, updateItemsByKey } from '../../knex/common';
import type { Bom, BomInventory } from '../../schema';
import type { CQB, PRF } from '../../typings';

/**
 * 根据 ids 查询物料
 */
export const getBomByIds$Q = async (query: CQB<Bom>, ids: Bom['id'][]) => {
  try {
    return await commonWhereInFilter(query, 'id', ids);
  } catch (err) {
    throw new Error(err as any);
  }
};

import type { ITypedQueryBuilder } from '@wwwouter/typed-knex';
import { clearQueryColumnAlias, wrapToArray } from '../.././helper/utils';
import type { RemoveObjectsFrom } from '../../typings';

// 创建一条
export const creatItem = <A>(
  query: ITypedQueryBuilder<A, A, A>,
  column: Partial<RemoveObjectsFrom<A>>,
): Promise<{ id: number } & Partial<RemoveObjectsFrom<A>>> => {
  try {
    return new Promise((resolve, reject) => {
      const col = clearQueryColumnAlias(query, column);

      query.useKnexQueryBuilder((sub) =>
        sub
          .insert(col)
          .returning('*')
          .then((res) => {
            resolve({
              id: res[0],
              ...column,
            } as { id: number } & Partial<RemoveObjectsFrom<A>>);
          })
          .catch((err) => {
            reject(err);
          }),
      );
    });
  } catch (err) {
    console.log('错误捕获 >>> ', err);
    throw new Error(err as any);
  }
};

// 创建多条数据
export const creatItems = async <A>(
  query: ITypedQueryBuilder<A, A, A>,
  body: Partial<RemoveObjectsFrom<A>> | Partial<RemoveObjectsFrom<A>>[],
) => {
  try {
    const bd = wrapToArray(body);
    const promiseList = [] as any;

    let insertList = null as any as {
      id: number;
    } & Partial<RemoveObjectsFrom<A>>;

    for (const it in bd) {
      insertList = await creatItem(query.clearWhere(), bd[it]);

      promiseList.push(insertList);
    }

    return promiseList as typeof insertList[];
  } catch (err) {
    console.log('creatItems ************************** ', err);
    throw new Error(err as any);
  }
};

import type { Knex } from 'knex';

import type { ITypedQueryBuilder } from '@wwwouter/typed-knex';
import type { NestedKeysOf } from '@wwwouter/typed-knex/dist/src/NestedKeysOf';
import type { NonNullableRecursive } from '@wwwouter/typed-knex/dist/src/NonNullableRecursive';
import type { GetNestedPropertyType } from '@wwwouter/typed-knex/dist/src/PropertyTypes';

export class ICustomDatabaseType {
  _?: () => void;
}

export type SelectableColumnTypes =
  | string
  | number
  | boolean
  | Date
  | undefined
  | null
  | any[]
  | ICustomDatabaseType;

export type ReturnNonObjectsNamesOnly<T> = {
  [K in keyof T]: T[K] extends SelectableColumnTypes ? K : never;
}[keyof T];

export type RemoveObjectsFrom<T> = {
  [P in ReturnNonObjectsNamesOnly<T>]: T[P];
};

export type InferQueryBuilderTypes<A> = A extends ITypedQueryBuilder<infer A, infer B, infer C>
  ? ITypedQueryBuilder<A, B, C>
  : never;

export type PRF<T> = Partial<RemoveObjectsFrom<T>>;

export type CQB<T> = ITypedQueryBuilder<T, T, T>;

export type FilterPRFColumnsByType<PRF, T> = {
  [P in keyof PRF as PRF[P] extends T ? P : never]: PRF[P];
};

export type FilterPRFNumberColumnsByTable<T> = FilterPRFColumnsByType<PRF<T>, number>;

export type FilterPRFStringColumnsByTable<T> = FilterPRFColumnsByType<PRF<T>, string>;

export type FilterPRFBooleanColumnsByTable<T> = FilterPRFColumnsByType<PRF<T>, boolean>;

export type EnumString = `Enum:${any}`;

export type typeRestArray = 'Array' | 'Number' | 'String' | 'Object' | 'Boolean';

type _AllCheckTypeKeys<T extends string> =
  | EnumString
  | T
  | `[?,${EnumString | T}]`
  | `[${typeRestArray},${typeRestArray}]`
  | `[${typeRestArray},${typeRestArray},${typeRestArray}]`
  | `[${typeRestArray},${typeRestArray},${typeRestArray},${typeRestArray}]`
  | `[${typeRestArray},${typeRestArray},${typeRestArray},${typeRestArray},${typeRestArray}]`
  | `[${typeRestArray},${typeRestArray},${typeRestArray},${typeRestArray},${typeRestArray},${typeRestArray}]`
  | `[${typeRestArray},${typeRestArray},${typeRestArray},${typeRestArray},${typeRestArray},${typeRestArray},${typeRestArray}]`;

export type AllCheckTypeKeys = _AllCheckTypeKeys<typeRestArray>;

export type RequiredAndType<T extends AllCheckTypeKeys> = `[?,${T}]`;

export type RequiredAndTypeMap = RequiredAndType<AllCheckTypeKeys>;

export type QT<A> = {
  query: CQB<A>;
  transaction: Knex.Transaction<any, any[]>;
};

export type FilterOperator = '=' | '!=' | '>' | '>=' | '<' | '<=' | 'like';

export type CommonFilterConfig<A> = {
  [P in NestedKeysOf<NonNullableRecursive<A>, keyof NonNullableRecursive<A>, ''>]?: {
    where?: [FilterOperator | string, GetNestedPropertyType<A, P>];
    andWhere?: [FilterOperator | string, GetNestedPropertyType<A, P>];
    whereLike?: [GetNestedPropertyType<A, P>, string];
    orWhere?: [FilterOperator | string, GetNestedPropertyType<A, P>];
    whereNull?: boolean;
    whereNotNull?: boolean;
    whereIn?: GetNestedPropertyType<A, P>[];
    orWhereIn?: GetNestedPropertyType<A, P>[];
    whereNotIn?: GetNestedPropertyType<A, P>[];
    orWhereNotIn?: GetNestedPropertyType<A, P>[];
    whereBetween?: [GetNestedPropertyType<A, P>, GetNestedPropertyType<A, P>];
    whereNotBetween?: [GetNestedPropertyType<A, P>, GetNestedPropertyType<A, P>];
    orWhereBetween?: [GetNestedPropertyType<A, P>, GetNestedPropertyType<A, P>];
    orWhereNotBetween?: [GetNestedPropertyType<A, P>, GetNestedPropertyType<A, P>];
  };
};

export type inferQueryJoinType<A> = A extends ITypedQueryBuilder<infer B, infer _C, infer _D>
  ? Record<
      NestedKeysOf<NonNullableRecursive<B>, keyof NonNullableRecursive<B>, ''>,
      GetNestedPropertyType<B, any>
    >
  : never;

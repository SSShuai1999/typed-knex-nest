import type { Knex as KnexType } from 'knex';
import { TypedKnex } from '@wwwouter/typed-knex';

export default (kx: KnexType<any, any>) => new TypedKnex(kx);

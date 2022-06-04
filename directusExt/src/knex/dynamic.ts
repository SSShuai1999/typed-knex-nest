import * as dotenv from 'dotenv';
import { KnexModule } from 'nestjs-knex';

dotenv.config();

export default KnexModule.forRoot({
  config: {
    client: process.env.DB_CLIENT,
    useNullAsDefault: true,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT as any as number,
    },
    debug: true,
    log: {
      debug(message) {
        console.log('sql query is : >>>', message.sql);
        console.log('sql bindings is : >>>', message.toNative().bindings);
      },
    },
  },
});

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DynamicKnex } from './knex';
import { BomModule } from './modules/bom/index.module';

@Module({
  imports: [
    DynamicKnex,
    BomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

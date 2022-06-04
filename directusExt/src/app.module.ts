import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DynamicKnex } from './knex';
import { BomModule } from './modules/bom/index.module';
import { ListQualityObjectionModule } from './modules/listQualityObjection/index.module';
import { OrderProductionModule } from './modules/orderProduction/index.module';
import { PlanDeliverModule } from './modules/planDeliver/index.module';
import { PlanVehicleModule } from './modules/planVehicle/index.module';

@Module({
  imports: [
    DynamicKnex,
    BomModule,
    ListQualityObjectionModule,
    OrderProductionModule,
    PlanDeliverModule,
    PlanVehicleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { BomController } from './index.controller';
import { BomService } from './index.service';

@Module({
  providers: [BomService],
  controllers: [BomController],
})
export class BomModule {}

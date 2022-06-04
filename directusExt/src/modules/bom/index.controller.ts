import { Body, Controller, Post } from '@nestjs/common';

import { BomService } from './index.service';

@Controller('/bom')
export class BomController {
  constructor(private readonly bomService: BomService) {}

  // 检查 Excel 导入数据
  @Post('checkExcelImport')
  async checkExcelImport(@Body() body: any) {
    return await this.bomService.checkExcelImport(body);
  }
}

import { defineEndpoint } from '@directus/extensions-sdk';

import { createTypedKnexIns } from '../../../../../helper';
import * as BomBusinessService from '../../../../../modules/bom/index.business';

export default defineEndpoint((router, config) => {
  const typedKnexIns = createTypedKnexIns(config.database);

  // 检查 Excel 导入数据
  router.post('/checkExcelImport', async (req: any, res: any) => {
    const r = await BomBusinessService.checkExcelImport$B(typedKnexIns, req.body);

    return res.json(r);
  });
});

import { z } from 'zod';

export const excelImportCheckZodParamsSchema = z.array(
    z.object({
        id_ord: z.string(),
        id_ord_itm: z.string(),
        id_matl: z.string(),
        num_bar: z.number().nullable().optional(),
        wt_act: z.number().nullable().optional(),
        tmstp_car_no: z.string().nullable().optional(),
    })
);
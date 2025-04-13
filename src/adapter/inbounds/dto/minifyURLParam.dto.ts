import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const minifyURLParam = z.object({
  URL: z.string(),
});

export class MinifyUrlParamDTO extends createZodDto(minifyURLParam) {}

export type MinifyURLResponseDTO = {
  minifiedURL: string;
};

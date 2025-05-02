import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import {
  MinifyUrlParamDTO,
  MinifyURLResponseDTO,
} from './dto/minifyURLParam.dto';
import { Response } from 'express';
import { MinifyURLUseCase } from 'src/applications/usecases/minifyURL.usecase';
import { RedirectUseCase } from 'src/applications/usecases/redirect.usecase';

@Controller()
export class URLController {
  constructor(
    private readonly minifyURLUseCase: MinifyURLUseCase,
    private readonly redirectUseCase: RedirectUseCase,
  ) {}

  @Post('/short')
  async shortenURL(
    @Body() { URL }: MinifyUrlParamDTO,
  ): Promise<MinifyURLResponseDTO> {
    const urlMapper = await this.minifyURLUseCase.executeMinifyURL(URL);
    return { minifiedURL: urlMapper.minifiedURL };
  }

  @Get('/:minifiedURL')
  async redirectToUrl(
    @Param('minifiedURL') minifiedURL: string,
    @Res() res: Response,
  ) {
    const redirectURL =
      await this.redirectUseCase.queryRedirectURL(minifiedURL);

    return res.status(HttpStatus.TEMPORARY_REDIRECT).redirect(redirectURL);
  }
}

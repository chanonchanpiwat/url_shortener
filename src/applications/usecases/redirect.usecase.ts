import { Config } from '../../utility/constant/config';
import { Injectable } from '@nestjs/common';
import { UnMinifyURLUseCase } from './unminifyURL.usecase';

@Injectable()
export class RedirectUseCase {
  constructor(
    private readonly unMinifyURLUseCased: UnMinifyURLUseCase,
    private readonly config: Config,
  ) {}

  async queryRedirectURL(minifiedURL: string) {
    const urlMapper =
      await this.unMinifyURLUseCased.queryOriginalURL(minifiedURL);

    return urlMapper ? urlMapper.originalURL : this.config.fallbackURL;
  }
}

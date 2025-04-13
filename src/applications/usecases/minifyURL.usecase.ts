import { Inject, Injectable } from '@nestjs/common';
import { URLMapper } from 'src/domain/entities/urlMapper';
import { URLRepositoryToken, URLRepository } from '../ports/url.repository';

@Injectable()
export class MinifyURLUseCase {
  constructor(
    @Inject(URLRepositoryToken)
    private readonly urlRepository: URLRepository,
  ) {}

  async executeMinifyURL(url: string): Promise<URLMapper> {
    return await this.urlRepository.createOne(url);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { URLMapper } from 'src/domain/entities/urlMapper';
import { URLRepository, URLRepositoryToken } from '../ports/url.repository';

export interface UnMinifyURL {
  queryOriginalURL(minifiedURL: string): Promise<URLMapper | null>;
}

@Injectable()
export class UnMinifyURLUseCase {
  constructor(
    @Inject(URLRepositoryToken)
    private readonly urlRepository: URLRepository,
  ) {}

  async queryOriginalURL(minifiedURL: string): Promise<URLMapper | null> {
    return await this.urlRepository.findOneById(minifiedURL);
  }
}

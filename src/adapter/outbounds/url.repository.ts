import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { URLRepository } from 'src/applications/ports/url.repository';
import { URLMapper } from 'src/domain/entities/urlMapper';
import { URLModel } from 'src/domain/models/url';
import { Repository } from 'typeorm';

@Injectable()
export class URLPostgresRepository implements URLRepository {
  constructor(
    @InjectRepository(URLModel)
    private urlRepository: Repository<URLModel>,
  ) {}

  async createOne(url: string): Promise<URLMapper> {
    const urlModel = await this.urlRepository.save({
      originalURL: url,
    });

    return this.toUrlMapper(urlModel) as URLMapper;
  }

  async findOneById(id: string): Promise<URLMapper | null> {
    const urlModel = await this.urlRepository.findOne({ where: { id } });

    return this.toUrlMapper(urlModel);
  }

  private toUrlMapper(urlModel: URLModel | null): URLMapper | null {
    return urlModel
      ? new URLMapper({
          originalURL: urlModel.originalURL,
          originalURLUniqId: urlModel.id,
          createdAt: urlModel.createdAt,
          updatedAt: urlModel.updatedAt,
        })
      : null;
  }
}

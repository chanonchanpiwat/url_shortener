import { URLMapper } from 'src/domain/entities/urlMapper';

export const URLRepositoryToken = Symbol('URLRepository').toString();

export interface URLRepository {
  createOne(url: string): Promise<URLMapper>;
  findOneById(id: string): Promise<URLMapper | null>;
}

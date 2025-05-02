import { URLRepository } from '../ports/url.repository';
import { mock } from 'jest-mock-extended';
import { MinifyURLUseCase } from './minifyURL.usecase';
import { URLMapper } from '../../domain/entities/urlMapper';

describe('MinifyURLUseCase', () => {
  let minifyURLUseCase: MinifyURLUseCase;
  const urlRepository = mock<URLRepository>();

  beforeEach(() => {
    minifyURLUseCase = new MinifyURLUseCase(urlRepository);
  });

  it('should minify url', async () => {
    const minifiedURL = 'abc';
    const resolveURLmapper = new URLMapper({
      originalURL: '',
      originalURLUniqId: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    urlRepository.createOne.mockResolvedValue(resolveURLmapper);

    const urlMapper = await minifyURLUseCase.executeMinifyURL(minifiedURL);
    expect(urlRepository.createOne).toHaveBeenCalledWith(minifiedURL);
    expect(urlMapper).toEqual(resolveURLmapper);
  });
});

import { URLRepository } from '../ports/url.repository';
import { mock } from 'jest-mock-extended';
import { UnMinifyURLUseCase } from './unminifyURL.usecase';

describe('UnMinifyURLUseCase', () => {
  let unMinifyURLUseCase: UnMinifyURLUseCase;
  const urlRepository = mock<URLRepository>();

  beforeEach(() => {
    unMinifyURLUseCase = new UnMinifyURLUseCase(urlRepository);
  });

  it('should unminify url', async () => {
    const minifiedURL = 'abc';

    await unMinifyURLUseCase.queryOriginalURL(minifiedURL);
    expect(urlRepository.findOneById).toHaveBeenCalledWith(minifiedURL);
  });
});

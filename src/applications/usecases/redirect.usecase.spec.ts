import { mock } from 'jest-mock-extended';
import { RedirectUseCase } from './redirect.usecase';
import { UnMinifyURLUseCase } from './unminifyURL.usecase';
import { Config } from '../../utility/constant/config';
import { URLMapper } from '../../domain/entities/urlMapper';

describe('RedirectUseCase', () => {
  const mockUnMinifyURLUseCase = mock<typeof UnMinifyURLUseCase.prototype>();
  const mockConfig = mock<typeof Config.prototype>();
  let redirectURLUseCase: RedirectUseCase;

  beforeEach(() => {
    redirectURLUseCase = new RedirectUseCase(
      mockUnMinifyURLUseCase,
      mockConfig,
    );
  });
  it('it should redirect url if minified url is found', async () => {
    const urlMapper = new URLMapper({
      originalURL: 'https://google.com',
      originalURLUniqId: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    mockUnMinifyURLUseCase.queryOriginalURL.mockResolvedValue(urlMapper);

    const redirectURL = await redirectURLUseCase.queryRedirectURL('');
    expect(redirectURL).toEqual(urlMapper.originalURL);
  });

  it('should return fallback url if minified is not found', async () => {
    mockUnMinifyURLUseCase.queryOriginalURL.mockResolvedValue(null);

    const redirectURL = await redirectURLUseCase.queryRedirectURL('');
    expect(redirectURL).toEqual(mockConfig.fallbackURL);
  });
});

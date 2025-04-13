export type URLMapperCreationParams = {
  originalURL: string;
  originalURLUniqId: string;
  createdAt: Date;
  updatedAt: Date;
};

export class URLMapper {
  originalURL: string;
  minifiedURL: string;
  createdAt: Date;
  updatedAt: Date;
  constructor({
    originalURL,
    originalURLUniqId,
    createdAt,
    updatedAt,
  }: URLMapperCreationParams) {
    this.originalURL = originalURL;
    this.minifiedURL = this.urlMapperFunction(originalURLUniqId);
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  private urlMapperFunction(uniqId: string): string {
    return `${process.env.HOST_URL}/${uniqId}`;
  }
}

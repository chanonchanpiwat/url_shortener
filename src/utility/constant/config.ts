import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Config {
  constructor(private readonly configService: ConfigService) {}

  get fallbackURL() {
    return this.configService.get<string>(
      'FALLBACK_URL',
      'http://localhost:3000',
    );
  }
}

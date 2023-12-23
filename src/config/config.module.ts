import { Global, Module } from '@nestjs/common';
import { AppConfigService } from './config.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [AppConfigService, ConfigService],
  exports: [AppConfigService],
})
export class ConfigModule {}

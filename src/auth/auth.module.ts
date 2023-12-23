import { Module, DynamicModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './auth.jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AppConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';

// validate [
//   { username: 'romel', iat: 1689044052, exp: 1689044112 },
//   [Function: verified]
// ]

@Module({})
export class AuthModule {
  public static forRootAsync(): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        PassportModule,
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [AppConfigService],
          useFactory: async (config: AppConfigService) => {
            const jwt = config.getJwtConfig();

            return {
              secret: jwt.secret,
              signOptions: { expiresIn: jwt.expiresIn },
            };
          },
        }),
      ],
      providers: [AuthService, JwtStrategy],
      controllers: [AuthController],
      exports: [AuthService],
    };
  }
}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import passport from 'passport';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwtStategt';
// import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'helloworld',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}

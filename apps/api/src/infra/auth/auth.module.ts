import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { JwtStrategy } from './jwt-strategy'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: 'teste' // Em um caso real, esse valor precisa ser uma variável ambiente.
    })
  ],
  providers: [JwtStrategy]
})
export class AuthModule {}

import { Module } from '@nestjs/common'

import { AuthModule } from './infra/auth/auth.module'
import { HttpModule } from './infra/http/http.module'

@Module({
  imports: [AuthModule, HttpModule]
})
export class AppModule {}

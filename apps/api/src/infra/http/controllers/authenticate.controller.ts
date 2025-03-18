import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException
} from '@nestjs/common'
import { z } from 'zod'

import { AuthenticateUseCase } from '@/domain/use-cases/authenticate-use-case'
import {
  UserDoesNotExistError,
  WrongCredentialsError
} from '@/domain/use-cases/errors'

const authenticateBodySchema = z.object({
  password: z.string(),
  username: z.string()
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/auth')
export class AuthenticateController {
  constructor(private authenticateUseCase: AuthenticateUseCase) {}

  @Post()
  async handle(@Body() body: AuthenticateBodySchema) {
    const { password, username } = body

    try {
      const { accessToken } = await this.authenticateUseCase.execute({
        password,
        username
      })

      return {
        access_token: accessToken
      }
    } catch (error) {
      if (error instanceof WrongCredentialsError) {
        throw new UnauthorizedException(error.message)
      }

      if (error instanceof UserDoesNotExistError) {
        throw new BadRequestException(error.message)
      }

      throw new BadRequestException()
    }
  }
}

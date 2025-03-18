import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes
} from '@nestjs/common'
import { z } from 'zod'

import { CreateUserUseCase } from '@/domain/use-cases/create-user-use-case'
import { WrongCredentialsError } from '@/domain/use-cases/errors'

import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const createUserBodySchema = z.object({
  confirmPassword: z.string(),
  password: z.string(),
  username: z.string()
})

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>

@Controller('/users')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserBodySchema))
  async handle(@Body() body: CreateUserBodySchema) {
    const { confirmPassword, password, username } = body

    try {
      const result = await this.createUserUseCase.execute({
        confirmPassword,
        password,
        username
      })

      return {
        user: result.user
      }
    } catch (error) {
      if (error instanceof WrongCredentialsError) {
        throw new BadRequestException(error.message)
      }

      throw new BadRequestException()
    }
  }
}

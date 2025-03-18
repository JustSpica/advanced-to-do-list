import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { z } from 'zod'

import { CreateTaskUseCase } from '@/domain/use-cases/create-task-use-case'
import { UserDoesNotExistError } from '@/domain/use-cases/errors'

import { UserPayload } from '@/infra/auth/jwt-strategy'

import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const createTaskBodySchema = z.object({
  description: z.string(),
  title: z.string()
})

type TaskBobySchema = z.infer<typeof createTaskBodySchema>

@Controller('/tasks')
@UseGuards(AuthGuard('jwt'))
export class CreateTaskController {
  constructor(private createTaskUseCase: CreateTaskUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createTaskBodySchema))
  async handle(@Body() body: TaskBobySchema, @Req() request: Request) {
    const { sub } = request.user as UserPayload

    const { description, title } = body

    try {
      const { task } = await this.createTaskUseCase.execute({
        authorId: sub,
        description,
        title
      })

      return {
        task
      }
    } catch (error) {
      if (error instanceof UserDoesNotExistError) {
        throw new BadRequestException(error.message)
      }

      throw new BadRequestException()
    }
  }
}

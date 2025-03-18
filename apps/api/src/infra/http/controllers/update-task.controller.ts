import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Param,
  Put,
  Req,
  UseGuards
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { z } from 'zod'

import {
  TaskDoesNotExistError,
  UserDoesNotAllowedError,
  UserDoesNotExistError
} from '@/domain/use-cases/errors'
import { UpdateTaskUseCase } from '@/domain/use-cases/update-task-use-case'

import { UserPayload } from '@/infra/auth/jwt-strategy'

import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const updateTaskBodySchema = z.object({
  description: z.string().optional(),
  status: z.boolean().optional(),
  title: z.string().optional()
})

const bodyValidationPipe = new ZodValidationPipe(updateTaskBodySchema)

type TaskBobySchema = z.infer<typeof updateTaskBodySchema>

@Controller('/tasks/:id')
@UseGuards(AuthGuard('jwt'))
export class UpdateTaskController {
  constructor(private updateTaskUseCase: UpdateTaskUseCase) {}

  @Put()
  async handle(
    @Param('id') taskId: string,
    @Body(bodyValidationPipe) body: TaskBobySchema,
    @Req() request: Request
  ) {
    const { sub } = request.user as UserPayload

    const { description, status, title } = body

    try {
      const { task } = await this.updateTaskUseCase.execute({
        authorId: sub,
        taskId,
        description,
        status,
        title
      })

      return {
        task
      }
    } catch (error) {
      if (error instanceof TaskDoesNotExistError) {
        throw new BadRequestException(error.message)
      }

      if (error instanceof UserDoesNotExistError) {
        throw new BadRequestException(error.message)
      }

      if (error instanceof UserDoesNotAllowedError) {
        throw new ForbiddenException(error.message)
      }

      throw new BadRequestException()
    }
  }
}

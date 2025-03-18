import {
  BadRequestException,
  Controller,
  Delete,
  ForbiddenException,
  HttpCode,
  Param,
  Req,
  UseGuards
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'

import { UserPayload } from '@/infra/auth/jwt-strategy'

import {
  TaskDoesNotExistError,
  UserDoesNotAllowedError
} from '@/domain/use-cases/errors'
import { DeleteTaskUseCase } from '@/domain/use-cases/delete-task-use-case'

@Controller('/tasks/:id')
@UseGuards(AuthGuard('jwt'))
export class DeleteTaskController {
  constructor(private deleteTaskUseCase: DeleteTaskUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') taskId: string, @Req() request: Request) {
    const { sub } = request.user as UserPayload

    try {
      await this.deleteTaskUseCase.execute({
        authorId: sub,
        taskId
      })
    } catch (error) {
      if (error instanceof TaskDoesNotExistError) {
        throw new BadRequestException(error.message)
      }

      if (error instanceof UserDoesNotAllowedError) {
        throw new ForbiddenException(error.message)
      }

      throw new BadRequestException()
    }
  }
}

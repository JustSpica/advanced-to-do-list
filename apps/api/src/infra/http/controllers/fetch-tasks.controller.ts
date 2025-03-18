import {
  BadRequestException,
  Controller,
  Get,
  Query,
  Req,
  UseGuards
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { z } from 'zod'

import { UserDoesNotExistError } from '@/domain/use-cases/errors'
import { FetchTasksUseCase } from '@/domain/use-cases/fetch-tasks-use-case'

import { UserPayload } from '@/infra/auth/jwt-strategy'

import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const pageQueryParamSchema = z
  .string()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/tasks')
@UseGuards(AuthGuard('jwt'))
export class FetchTasksController {
  constructor(private fetchTasksUseCase: FetchTasksUseCase) {}

  @Get()
  async handle(
    @Req() request: Request,
    @Query('page', queryValidationPipe) page: PageQueryParamSchema
  ) {
    const { sub } = request.user as UserPayload

    try {
      const { tasks } = await this.fetchTasksUseCase.execute({
        authorId: sub,
        page
      })

      return {
        tasks
      }
    } catch (error) {
      if (error instanceof UserDoesNotExistError) {
        throw new BadRequestException(error.message)
      }

      throw new BadRequestException()
    }
  }
}

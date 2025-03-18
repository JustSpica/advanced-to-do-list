import { Module } from '@nestjs/common'

import { AuthenticateUseCase } from '@/domain/use-cases/authenticate-use-case'
import { CreateTaskUseCase } from '@/domain/use-cases/create-task-use-case'
import { CreateUserUseCase } from '@/domain/use-cases/create-user-use-case'
import { DeleteTaskUseCase } from '@/domain/use-cases/delete-task-use-case'
import { FetchTasksUseCase } from '@/domain/use-cases/fetch-tasks-use-case'
import { UpdateTaskUseCase } from '@/domain/use-cases/update-task-use-case'

import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateTaskController } from './controllers/create-task.controller'
import { CreateUserController } from './controllers/create-user.controller'
import { DeleteTaskController } from './controllers/delete-task.controller'
import { FetchTasksController } from './controllers/fetch-tasks.controller'
import { UpdateTaskController } from './controllers/update-task.controller'

import { DatabaseModule } from '../database/database.module'

@Module({
  controllers: [
    AuthenticateController,
    CreateTaskController,
    CreateUserController,
    DeleteTaskController,
    FetchTasksController,
    UpdateTaskController
  ],
  imports: [DatabaseModule],
  providers: [
    AuthenticateUseCase,
    CreateTaskUseCase,
    CreateUserUseCase,
    DeleteTaskUseCase,
    FetchTasksUseCase,
    UpdateTaskUseCase
  ]
})
export class HttpModule {}

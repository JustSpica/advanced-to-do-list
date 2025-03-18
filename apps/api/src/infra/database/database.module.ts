import { Module } from '@nestjs/common'

import { TasksRepository } from '@/domain/repositories/tasks-repository'
import { UsersRepository } from '@/domain/repositories/users-repository'

import { PrismaService } from './prisma/prisma.service'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'
import { PrismaTaskRepository } from './prisma/repositories/prisma-task-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository
    },
    {
      provide: TasksRepository,
      useClass: PrismaTaskRepository
    }
  ],
  exports: [PrismaService, TasksRepository, UsersRepository]
})
export class DatabaseModule {}

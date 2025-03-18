import { Injectable } from '@nestjs/common'
import { Task } from '@prisma/client'

import { UserDoesNotExistError } from './errors'

import { UsersRepository } from '../repositories/users-repository'
import { TasksRepository } from '../repositories/tasks-repository'

interface FetchTasksUseCaseRequest {
  authorId: string
  page: number
}

interface FetchTasksUseCaseResponse {
  metadata: {
    count: number
  }
  tasks: Task[]
}

@Injectable()
export class FetchTasksUseCase {
  constructor(
    private taskRepository: TasksRepository,
    private userRepository: UsersRepository
  ) {}

  async execute({
    authorId,
    page
  }: FetchTasksUseCaseRequest): Promise<FetchTasksUseCaseResponse> {
    const user = await this.userRepository.findById(authorId)

    if (!user) {
      throw new UserDoesNotExistError()
    }

    const tasks = await this.taskRepository.findManyByUserId(authorId, page)

    return tasks
  }
}

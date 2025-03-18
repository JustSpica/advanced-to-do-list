import { Injectable } from '@nestjs/common'
import { Task } from '@prisma/client'

import { UserDoesNotExistError } from './errors'

import { UsersRepository } from '../repositories/users-repository'
import { TasksRepository } from '../repositories/tasks-repository'

interface CreateTaskUseCaseRequest {
  authorId: string
  description: string
  title: string
}

interface CreateTaskUseCaseResponse {
  task: Task
}

@Injectable()
export class CreateTaskUseCase {
  constructor(
    private taskRepository: TasksRepository,
    private userRepository: UsersRepository
  ) {}

  async execute({
    authorId,
    description,
    title
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const user = await this.userRepository.findById(authorId)

    if (!user) {
      throw new UserDoesNotExistError()
    }

    const task = await this.taskRepository.create({
      description,
      status: false,
      title,
      userId: authorId
    })

    return {
      task
    }
  }
}

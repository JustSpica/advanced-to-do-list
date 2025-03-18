import { Injectable } from '@nestjs/common'

import { TaskDoesNotExistError, UserDoesNotAllowedError } from './errors'

import { TasksRepository } from '../repositories/tasks-repository'
import { UsersRepository } from '../repositories/users-repository'

interface DeleteTaskUseCaseRequest {
  authorId: string
  taskId: string
}

interface DeleteTaskUseCaseResponse {}

@Injectable()
export class DeleteTaskUseCase {
  constructor(
    private taskRepository: TasksRepository,
    private userRepository: UsersRepository
  ) {}

  async execute({
    authorId,
    taskId
  }: DeleteTaskUseCaseRequest): Promise<DeleteTaskUseCaseResponse> {
    const task = await this.taskRepository.findById(taskId)

    if (!task) {
      throw new TaskDoesNotExistError()
    }

    if (task.userId !== authorId) {
      throw new UserDoesNotAllowedError()
    }

    await this.taskRepository.delete(taskId)

    return {}
  }
}

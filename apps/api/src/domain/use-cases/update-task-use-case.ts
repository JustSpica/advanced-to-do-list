import { Injectable } from '@nestjs/common'
import { Task } from '@prisma/client'

import {
  TaskDoesNotExistError,
  UserDoesNotAllowedError,
  UserDoesNotExistError
} from './errors'

import { UsersRepository } from '../repositories/users-repository'
import { TasksRepository } from '../repositories/tasks-repository'

interface UpdateTaskUseCaseRequest {
  authorId: string
  taskId: string
  description?: string
  status?: boolean
  title?: string
}

interface UpdateTaskUseCaseResponse {
  task: Task
}

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    private taskRepository: TasksRepository,
    private userRepository: UsersRepository
  ) {}

  async execute({
    authorId,
    taskId,
    description,
    status,
    title
  }: UpdateTaskUseCaseRequest): Promise<UpdateTaskUseCaseResponse> {
    const user = await this.userRepository.findById(authorId)

    if (!user) {
      throw new UserDoesNotExistError()
    }

    const task = await this.taskRepository.findById(taskId)

    if (!task) {
      throw new TaskDoesNotExistError()
    }

    if (authorId !== task.userId) {
      throw new UserDoesNotAllowedError()
    }

    const updatedTask = await this.taskRepository.save({
      id: taskId,
      description,
      status,
      title
    })

    return {
      task: updatedTask
    }
  }
}

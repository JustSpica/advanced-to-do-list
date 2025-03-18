import { Prisma, Task } from '@prisma/client'
import { Injectable } from '@nestjs/common'

import { TasksRepository } from '@/domain/repositories/tasks-repository'

import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaTaskRepository implements TasksRepository {
  constructor(private prisma: PrismaService) {}

  async create(task: Prisma.TaskUncheckedCreateInput) {
    return await this.prisma.task.create({
      data: task
    })
  }

  async findById(id: string): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({
      where: {
        id
      }
    })

    if (!task) {
      return null
    }

    return task
  }

  async findManyByUserId(userId: string, page: number) {
    return await this.prisma.task.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      skip: (page - 1) * 10,
      take: 10,
      where: {
        userId
      }
    })
  }

  async delete(id: string) {
    await this.prisma.task.delete({
      where: {
        id
      }
    })
  }

  async save(task: Prisma.TaskUpdateInput) {
    return await this.prisma.task.update({
      where: {
        id: task.id.toString()
      },
      data: task
    })
  }
}

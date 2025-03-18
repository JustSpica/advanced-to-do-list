import { Prisma, Task } from '@prisma/client'

type FindManyPaginated = {
  metadata: {
    count: number
  }
  tasks: Task[]
}

export abstract class TasksRepository {
  abstract create(task: Prisma.TaskUncheckedCreateInput): Promise<Task>
  abstract findById(id: string): Promise<Task | null>
  abstract findManyByUserId(
    userId: string,
    page: number
  ): Promise<FindManyPaginated>

  abstract delete(id: string): Promise<void>
  abstract save(task: Prisma.TaskUncheckedUpdateInput): Promise<Task>
}

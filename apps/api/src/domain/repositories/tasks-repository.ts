import { Prisma, Task } from '@prisma/client'

export abstract class TasksRepository {
  abstract create(task: Prisma.TaskUncheckedCreateInput): Promise<Task>
  abstract findById(id: string): Promise<Task | null>
  abstract findManyByUserId(userId: string, page: number): Promise<Task[]>
  abstract delete(id: string): Promise<void>
  abstract save(task: Prisma.TaskUncheckedUpdateInput): Promise<Task>
}

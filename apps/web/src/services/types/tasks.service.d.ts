import { AxiosResponse } from 'axios'

type Task = {
  status: boolean
  id: string
  title: string
  description: string
  createdAt: Date
  userId: string
}

type CreateTaskData = {
  description: string
  title: string
}

type TaskRespose = {
  task: Task
}

type FindManyResponse = {
  metadata: {
    count: number
  }
  tasks: Task[]
}

type UpdateTaskData = Partial<{
  description: string
  status: boolean
  title: string
}>

interface TasksService {
  create(data: CreateTaskData): Promise<AxiosResponse<TaskRespose>>
  delete(taskId: string): Promise<void>
  findMany(page: number): Promise<AxiosResponse<FindManyResponse>>
  save(
    taskId: string,
    data: UpdateTaskData
  ): Promise<AxiosResponse<TaskRespose>>
}

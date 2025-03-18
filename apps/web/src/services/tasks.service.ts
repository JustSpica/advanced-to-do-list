import { api } from '@app/lib/axios'

import {
  CreateTaskData,
  FindManyResponse,
  TaskRespose,
  TasksService,
  UpdateTaskData
} from './types/tasks.service'

export class HttpTasksService implements TasksService {
  accessToken = localStorage.getItem('access_token')?.toString()

  async create(data: CreateTaskData) {
    return await api.post<TaskRespose>('/tasks', data, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    })
  }

  async delete(taskId: string) {
    await api.delete(`/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    })
  }

  async findMany(page: number) {
    return await api.get<FindManyResponse>(`/tasks?page=${page}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    })
  }

  async save(taskId: string, data: UpdateTaskData) {
    return await api.put<TaskRespose>(`/tasks/${taskId}`, data, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    })
  }

  static create() {
    const taskService = new HttpTasksService()

    return taskService
  }
}

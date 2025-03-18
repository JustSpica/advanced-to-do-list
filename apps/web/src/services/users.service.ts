import { api } from '@app/lib/axios'

import {
  Auth,
  AuthData,
  CreateUserData,
  User,
  UsersService
} from './types/users.service'

export class HttpUsersService implements UsersService {
  async auth(data: AuthData) {
    return await api.post<Auth>('/auth', data)
  }

  async create(data: CreateUserData) {
    return await api.post<User>('/users', data)
  }

  static create() {
    const userService = new HttpUsersService()

    return userService
  }
}

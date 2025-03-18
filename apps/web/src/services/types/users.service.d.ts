import { AxiosResponse } from 'axios'

type AuthData = {
  password: string
  username: string
}

type Auth = {
  access_token: string
}

type CreateUserData = {
  confirmPassword: string
  password: string
  username: string
}

type User = {
  user: {
    id: string
    username: string
  }
}

interface UsersService {
  auth(data: AuthData): Promise<AxiosResponse<Auth>>
  create(data: CreateUserData): Promise<AxiosResponse<User>>
}

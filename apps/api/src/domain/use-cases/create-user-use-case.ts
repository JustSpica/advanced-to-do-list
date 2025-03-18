import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

import { WrongCredentialsError } from './errors'

import { UsersRepository } from '../repositories/users-repository'

interface CreateUserUseCaseRequest {
  confirmPassword: string
  password: string
  username: string
}

interface CreateUserUseCaseResponse {
  user: Omit<User, 'passwordHash'>
}

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    confirmPassword,
    password,
    username
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    if (confirmPassword !== password) {
      throw new WrongCredentialsError()
    }

    const passwordHash = await hash(password, 8)

    const user = await this.userRepository.create({
      passwordHash,
      username
    })
    delete user.passwordHash

    return {
      user
    }
  }
}

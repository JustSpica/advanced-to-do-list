import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'

import { UsersRepository } from '../repositories/users-repository'
import { UserDoesNotExistError, WrongCredentialsError } from './errors'

interface AuthenticateUseCaseRequest {
  password: string
  username: string
}

interface AuthenticateUseCaseResponse {
  accessToken: string
}

@Injectable()
export class AuthenticateUseCase {
  constructor(
    private userRepository: UsersRepository,
    private jwt: JwtService
  ) {}

  async execute({
    password,
    username
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByUsername(username)

    if (!user) {
      throw new UserDoesNotExistError()
    }

    const isPasswordValid = await compare(password, user.passwordHash)

    if (!isPasswordValid) {
      throw new WrongCredentialsError()
    }

    const accessToken = this.jwt.sign({ sub: user.id })

    return {
      accessToken
    }
  }
}

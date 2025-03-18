import { Prisma } from '@prisma/client'
import { Injectable } from '@nestjs/common'

import { UsersRepository } from '@/domain/repositories/users-repository'

import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: Prisma.UserCreateInput) {
    return await this.prisma.user.create({
      data: user
    })
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!user) {
      return null
    }

    return user
  }

  async findByUsername(username: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        username
      }
    })

    if (!user) {
      return null
    }

    return user
  }
}

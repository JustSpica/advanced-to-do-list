import { Prisma, User } from '@prisma/client'

export abstract class UsersRepository {
  abstract create(user: Prisma.UserCreateInput): Promise<User>
  abstract findById(id: string): Promise<User | null>
  abstract findByUsername(username: string): Promise<User | null>
}

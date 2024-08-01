import { PrismaClient, User } from '@prisma/client';

export class UserService {
  private prisma = new PrismaClient();

  async createUser(data: { name: string; email: string }): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}

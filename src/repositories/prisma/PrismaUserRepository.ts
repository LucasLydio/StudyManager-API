import type { UserRepository, CreateUserInput, UpdateUserInput } from "../UserRepository";
import type { UserEntity } from "../../entities/User";
import { prisma } from "../../infrastructure/prisma/prismaClient";

function toEntity(row: { id: number; name: string; email: string; createdAt: Date }): UserEntity {
  return { id: row.id, name: row.name, email: row.email, createdAt: row.createdAt };
}

export class PrismaUserRepository implements UserRepository {
  async create(input: CreateUserInput): Promise<UserEntity> {
    const row = await prisma.user.create({ data: input });
    return toEntity(row);
  }

  async findMany(): Promise<UserEntity[]> {
    const rows = await prisma.user.findMany({ orderBy: { id: "asc" } });
    return rows.map(toEntity);
  }

  async findById(id: number): Promise<UserEntity | null> {
    const row = await prisma.user.findUnique({ where: { id } });
    return row ? toEntity(row) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const row = await prisma.user.findUnique({ where: { email } });
    return row ? toEntity(row) : null;
  }

  async update(id: number, input: UpdateUserInput): Promise<UserEntity> {
    const row = await prisma.user.update({ where: { id }, data: input });
    return toEntity(row);
  }

  async delete(id: number): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}


import type { UserRepository, CreateUserInput, UpdateUserInput } from "../repositories/UserRepository";
import { AppError } from "../shared/errors/AppError";
import { ErrorCodes } from "../shared/errors/errorCodes";

export class UserService {
  constructor(private readonly users: UserRepository) {}

  async create(input: CreateUserInput) {
    const existing = await this.users.findByEmail(input.email);
    if (existing) {
      throw new AppError({
        statusCode: 409,
        code: ErrorCodes.Conflict,
        message: "Email already in use."
      });
    }

    return this.users.create(input);
  }

  async list() {
    return this.users.findMany();
  }

  async getById(id: number) {
    const user = await this.users.findById(id);
    if (!user) {
      throw new AppError({ statusCode: 404, code: ErrorCodes.NotFound, message: "User not found." });
    }
    return user;
  }

  async update(id: number, input: UpdateUserInput) {
    const existing = await this.users.findById(id);
    if (!existing) {
      throw new AppError({ statusCode: 404, code: ErrorCodes.NotFound, message: "User not found." });
    }

    if (input.email && input.email !== existing.email) {
      const emailOwner = await this.users.findByEmail(input.email);
      if (emailOwner) {
        throw new AppError({
          statusCode: 409,
          code: ErrorCodes.Conflict,
          message: "Email already in use."
        });
      }
    }

    return this.users.update(id, input);
  }

  async delete(id: number) {
    const existing = await this.users.findById(id);
    if (!existing) {
      throw new AppError({ statusCode: 404, code: ErrorCodes.NotFound, message: "User not found." });
    }
    await this.users.delete(id);
  }
}


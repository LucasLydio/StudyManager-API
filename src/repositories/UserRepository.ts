import type { UserEntity } from "../entities/User";

export type CreateUserInput = {
  name: string;
  email: string;
};

export type UpdateUserInput = {
  name?: string;
  email?: string;
};

export interface UserRepository {
  create(input: CreateUserInput): Promise<UserEntity>;
  findMany(): Promise<UserEntity[]>;
  findById(id: number): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  update(id: number, input: UpdateUserInput): Promise<UserEntity>;
  delete(id: number): Promise<void>;
}


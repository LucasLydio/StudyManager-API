import type { UserEntity } from "../entities/User";

export function toUserJson(user: UserEntity) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.createdAt.toISOString()
  };
}


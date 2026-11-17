import { api } from "../api/client";
import type { User } from "../types";

// PATCH chỉ gửi trường thay đổi; json-server trả cả password nên phải bỏ trước khi return.
export async function updateProfile(id: number, data: Pick<User, "name" | "phone">): Promise<User> {
  const res = await api.patch<User & { password?: string }>(`/users/${id}`, data);
  const { password: _pw, ...user } = res.data;
  return user;
}

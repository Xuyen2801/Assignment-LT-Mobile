import { api } from "../api/client";
import type { User } from "../types";

type StoredUser = User & { password: string };

const stripPassword = ({ password: _pw, ...user }: StoredUser): User => user;

// Đăng nhập giả lập: lấy user theo email rồi tự so mật khẩu.
export async function login(email: string, password: string): Promise<{ user: User; token: string }> {
  const { data } = await api.get<StoredUser[]>("/users", {
    params: { email: email.trim().toLowerCase() },
  });
  const found = data[0];
  if (!found || found.password !== password) {
    throw new Error("Email hoặc mật khẩu không đúng");
  }
  return { user: stripPassword(found), token: `fake-token-${found.id}-${Date.now()}` };
}

// Đăng ký: kiểm tra email chưa tồn tại rồi POST /users
export async function register(name: string, email: string, password: string): Promise<{ user: User; token: string }> {
  const normalized = email.trim().toLowerCase();
  const { data: existing } = await api.get<StoredUser[]>("/users", { params: { email: normalized } });
  if (existing.length > 0) throw new Error("Email này đã được đăng ký");
  const { data } = await api.post<StoredUser>("/users", {
    name: name.trim(),
    email: normalized,
    password,
  });
  return { user: stripPassword(data), token: `fake-token-${data.id}-${Date.now()}` };
}

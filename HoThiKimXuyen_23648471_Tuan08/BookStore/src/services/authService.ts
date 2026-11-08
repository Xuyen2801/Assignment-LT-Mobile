import { api } from "../api/client";
import type { User } from "../types";

type StoredUser = User & { password: string };

// Đăng nhập giả lập: lấy user theo email rồi tự so mật khẩu.
// Hệ thống thật phải để server kiểm tra.
export async function login(email: string, password: string): Promise<{ user: User; token: string }> {
  const { data } = await api.get<StoredUser[]>("/users", {
    params: { email: email.trim().toLowerCase() },
  });
  const found = data[0];
  if (!found || found.password !== password) {
    throw new Error("Email hoặc mật khẩu không đúng");
  }
  const { password: _unused, ...user } = found; // bỏ mật khẩu trước khi đưa vào app
  return { user, token: `fake-token-${user.id}-${Date.now()}` };
}

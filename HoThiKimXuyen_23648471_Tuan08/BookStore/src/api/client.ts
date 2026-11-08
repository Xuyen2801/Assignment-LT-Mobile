import axios from "axios";

// Máy ảo Android dùng http://10.0.2.2:3000, điện thoại thật dùng IP máy tính
export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

export const api = axios.create({ baseURL: API_URL, timeout: 8000 });

export function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    if (!err.response) return "Không kết nối được máy chủ. Hãy kiểm tra json-server đã chạy chưa.";
    return "Máy chủ gặp lỗi, vui lòng thử lại";
  }
  if (err instanceof Error) return err.message;
  return "Đã có lỗi xảy ra";
}
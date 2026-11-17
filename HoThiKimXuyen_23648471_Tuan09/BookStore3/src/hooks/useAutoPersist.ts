import { useEffect } from "react";
import { saveJSON } from "../utils/storage";

// Mỗi khi value đổi (và đã nạp xong dữ liệu cũ) thì tự ghi vào AsyncStorage.
export function useAutoPersist<T>(key: string, value: T, ready: boolean) {
  useEffect(() => {
    if (ready) saveJSON(key, value);
  }, [key, value, ready]);
}

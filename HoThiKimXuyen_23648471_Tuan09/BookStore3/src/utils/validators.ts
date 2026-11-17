export const validateRequired = (label: string) => (v: string): string | null =>
  v.trim() ? null : `Vui lòng nhập ${label}`;

export const validateEmail = (v: string): string | null => {
  const s = v.trim();
  if (!s) return "Vui lòng nhập email";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return "Email không đúng định dạng";
  return null;
};

export const validatePassword = (v: string): string | null => {
  if (!v) return "Vui lòng nhập mật khẩu";
  if (v.length < 6) return "Mật khẩu tối thiểu 6 ký tự";
  return null;
};

export const validatePhone = (v: string): string | null => {
  if (!v.trim()) return "Vui lòng nhập số điện thoại";
  return /^(0|\+84)\d{9}$/.test(v.replace(/\s/g, "")) ? null : "Số điện thoại không hợp lệ (vd 0901234567)";
};

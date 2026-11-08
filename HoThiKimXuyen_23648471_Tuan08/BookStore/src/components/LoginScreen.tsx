import { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

import { FormField } from "../components/FormField";
import { PrimaryButton } from "../components/PrimaryButton";
import { login } from "../services/authService";
import { useAuth } from "../store/hooks";
import { validateEmail, validatePassword } from "../utils/validators";
import { getErrorMessage } from "../api/client";          // đổi nếu project để ở file khác
import type { RootScreenProps } from "../navigation/types"; // đổi nếu project để ở file khác

export function LoginScreen({ navigation, route }: RootScreenProps<"Login">) {
  const { signIn } = useAuth();

  // Dữ liệu người dùng nhập
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Lỗi dưới từng ô, lỗi chung từ server, trạng thái đang gọi API
  const [errors, setErrors] = useState<{ email?: string | null; password?: string | null }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    // Bước 1: kiểm tra dữ liệu, còn lỗi thì dừng, chưa gọi API
    const e = {
      email: validateEmail(email),
      password: validatePassword(password),
    };
    setErrors(e);
    if (e.email || e.password) return;

    // Bước 2: gọi API và lưu người dùng vào store
    setLoading(true);
    setSubmitError(null);
    try {
      const { user, token } = await login(email, password);
      signIn(user, token);

      // Bước 3: điều hướng
      if (route.params?.redirectTo === "Checkout") {
        navigation.replace("Checkout", { total: route.params.total ?? 0 });
      } else {
        navigation.navigate("Tabs", { screen: "Home" });
      }
    } catch (err) {
      // Bước 4: báo lỗi chung (ví dụ sai mật khẩu)
      setSubmitError(getErrorMessage(err));
    } finally {
      setLoading(false); // luôn tắt loading, dù thành công hay lỗi
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <FormField
        label="Email"
        value={email}
        onChangeText={setEmail}
        error={errors.email}
        keyboardType="email-address"
      />
      <FormField
        label="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        error={errors.password}
        secureTextEntry
      />

      {submitError ? <Text style={styles.submitError}>{submitError}</Text> : null}

      <PrimaryButton title="Đăng nhập" onPress={submit} loading={loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  submitError: { color: "#D92D20", marginBottom: 12 },
});
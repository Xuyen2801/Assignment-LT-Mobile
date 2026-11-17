import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { RootScreenProps } from "../navigation/types";
import { Header } from "../components/Header";
import { FormField } from "../components/FormField";
import { PrimaryButton } from "../components/PrimaryButton";
import { login } from "../services/authService";
import { validateEmail, validatePassword } from "../utils/validators";
import { getErrorMessage } from "../api/client";
import { useAuth } from "../store/hooks";
import { colors, radius } from "../theme";

export function LoginScreen({ navigation, route }: RootScreenProps<"Login">) {
  const { signIn } = useAuth();
  const redirectTo = route.params?.redirectTo;
  const bookId = route.params?.bookId;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const errors = { email: validateEmail(email), password: validatePassword(password) };
  const valid = !errors.email && !errors.password;

  const submit = async () => {
    setTouched(true);
    if (!valid) return;
    setLoading(true);
    setSubmitError(null);
    try {
      const { user, token } = await login(email, password);
      signIn(user, token);
      if (redirectTo === "Checkout") {
        navigation.replace("Checkout");
      } else if (redirectTo === "BookDetail" && bookId) {
        navigation.replace("BookDetail", { bookId });
      } else if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate("Tabs", { screen: "Account" });
      }
    } catch (e) {
      setSubmitError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="🔐 Đăng nhập" />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <FormField label="Email" value={email} onChangeText={setEmail} error={touched ? errors.email : null} keyboardType="email-address" placeholder="demo@bookstore.vn" />
          <FormField label="Mật khẩu" value={password} onChangeText={setPassword} error={touched ? errors.password : null} secureTextEntry placeholder="••••••" />
        </View>
        {submitError ? <Text style={styles.error}>{submitError}</Text> : null}
        <PrimaryButton title="Đăng nhập" onPress={submit} loading={loading} disabled={!valid} />
        <Text style={styles.switch} onPress={() => navigation.navigate("Register")}>
          Chưa có tài khoản? <Text style={styles.link}>Đăng ký ngay</Text>
        </Text>
        <Text style={styles.demo}>Tài khoản demo: demo@bookstore.vn / 123456</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 8, paddingBottom: 40 },
  card: { backgroundColor: colors.card, borderRadius: radius.md, padding: 14, borderWidth: 1, borderColor: colors.line },
  error: { color: colors.danger, fontWeight: "700", textAlign: "center" },
  switch: { textAlign: "center", color: colors.muted, marginTop: 14 },
  link: { color: colors.indigo, fontWeight: "800" },
  demo: { textAlign: "center", color: colors.muted, fontSize: 12, marginTop: 16 },
});

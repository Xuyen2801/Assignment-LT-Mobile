import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { RootScreenProps } from "../navigation/types";
import { Header } from "../components/Header";
import { FormField } from "../components/FormField";
import { PrimaryButton } from "../components/PrimaryButton";
import { register } from "../services/authService";
import { validateRequired, validateEmail, validatePassword } from "../utils/validators";
import { getErrorMessage } from "../api/client";
import { useAuth } from "../store/hooks";
import { colors, radius } from "../theme";

export function RegisterScreen({ navigation }: RootScreenProps<"Register">) {
  const { signIn } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const errors = {
    name: validateRequired("họ tên")(name),
    email: validateEmail(email),
    password: validatePassword(password),
    confirm: !confirm ? "Vui lòng nhập lại mật khẩu" : confirm !== password ? "Mật khẩu nhập lại không khớp" : null,
  };
  const valid = !errors.name && !errors.email && !errors.password && !errors.confirm;

  const submit = async () => {
    setTouched(true);
    if (!valid) return;
    setLoading(true);
    setSubmitError(null);
    try {
      const { user, token } = await register(name, email, password);
      signIn(user, token);
      navigation.navigate("Tabs", { screen: "Account" });
    } catch (e) {
      setSubmitError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="📝 Đăng ký" />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <FormField label="Họ tên" value={name} onChangeText={setName} error={touched ? errors.name : null} autoCapitalize="words" />
          <FormField label="Email" value={email} onChangeText={setEmail} error={touched ? errors.email : null} keyboardType="email-address" />
          <FormField label="Mật khẩu" value={password} onChangeText={setPassword} error={touched ? errors.password : null} secureTextEntry />
          <FormField label="Nhập lại mật khẩu" value={confirm} onChangeText={setConfirm} error={touched ? errors.confirm : null} secureTextEntry />
        </View>
        {submitError ? <Text style={styles.error}>{submitError}</Text> : null}
        <PrimaryButton title="Tạo tài khoản" onPress={submit} loading={loading} disabled={!valid} />
        <Text style={styles.switch} onPress={() => navigation.goBack()}>
          Đã có tài khoản? <Text style={styles.link}>Đăng nhập</Text>
        </Text>
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
});

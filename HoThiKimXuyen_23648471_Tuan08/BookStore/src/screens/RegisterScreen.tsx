import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootScreenProps } from "../navigation/types";
import { FormField } from "../components/FormField";
import { PrimaryButton } from "../components/PrimaryButton";
import { useAuth } from "../store/hooks";
import { register } from "../services/authService";
import { validateEmail, validatePassword, validateRequired } from "../utils/validators";
import { getErrorMessage } from "../api/client";
import { colors } from "../utils/colors";

export function RegisterScreen({ navigation, route }: RootScreenProps<"Register">) {
  const { signIn } = useAuth();
  
  // TODO BT8.2: state name, email, password, confirm, errors, submitError, loading
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{
    name?: string | null;
    email?: string | null;
    password?: string | null;
    confirm?: string | null;
  }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // TODO BT8.2: hàm submit
  const submit = async () => {
    const nameErr = validateRequired("họ tên")(name);
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    const confirmErr = confirm === password ? null : "Mật khẩu nhập lại không khớp";

    const e = {
      name: nameErr,
      email: emailErr,
      password: passwordErr,
      confirm: confirmErr,
    };

    setErrors(e);
    if (Object.values(e).some(Boolean)) return;

    setLoading(true);
    setSubmitError(null);
    try {
      const { user, token } = await register(name, email, password);
      signIn(user, token);
      navigation.navigate("Tabs", { screen: "Home" });
    } catch (err) {
      setSubmitError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <FormField 
        label="Họ tên" 
        value={name} 
        onChangeText={setName} 
        error={errors.name} 
      />
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
      <FormField 
        label="Nhập lại mật khẩu" 
        value={confirm} 
        onChangeText={setConfirm} 
        error={errors.confirm} 
        secureTextEntry 
      />

      {submitError ? <Text style={styles.submitError}>{submitError}</Text> : null}
      
      <PrimaryButton title="Đăng ký" onPress={submit} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  submitError: {
    color: colors.error,
    marginBottom: 12,
    textAlign: "center",
  },
});
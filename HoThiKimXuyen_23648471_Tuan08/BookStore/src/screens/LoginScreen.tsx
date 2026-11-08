import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootScreenProps } from "../navigation/types";
import { FormField } from "../components/FormField";
import { PrimaryButton } from "../components/PrimaryButton";
import { useAuth } from "../store/hooks";
import { login } from "../services/authService";
import { validateEmail, validatePassword } from "../utils/validators";
import { getErrorMessage } from "../api/client";
import { colors } from "../utils/colors";

export function LoginScreen({ navigation, route }: RootScreenProps<"Login">) {
  const { signIn } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string | null; password?: string | null }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const e = { email: validateEmail(email), password: validatePassword(password) };
    setErrors(e);
    if (e.email || e.password) return;

    setLoading(true);
    setSubmitError(null);
    try {
      const { user, token } = await login(email, password);
      signIn(user, token);
      if (route.params?.redirectTo === "Checkout") {
        navigation.replace("Checkout", { total: route.params.total ?? 0 });
      } else {
        navigation.navigate("Tabs", { screen: "Home" });
      }
    } catch (err) {
      setSubmitError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
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
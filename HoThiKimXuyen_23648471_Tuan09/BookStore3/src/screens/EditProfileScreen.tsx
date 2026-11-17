import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { RootScreenProps } from "../navigation/types";
import { Header } from "../components/Header";
import { FormField } from "../components/FormField";
import { PrimaryButton } from "../components/PrimaryButton";
import { useAuth } from "../store/hooks";
import { updateProfile } from "../services/userService";
import { validateRequired, validatePhone } from "../utils/validators";
import { getErrorMessage } from "../api/client";
import { showMessage } from "../utils/dialog";
import { colors, radius } from "../theme";

export function EditProfileScreen({ navigation }: RootScreenProps<"EditProfile">) {
  const { user, patchUser } = useAuth();

  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const errors = {
    name: validateRequired("họ tên")(name),
    phone: validatePhone(phone),
  };
  const valid = !errors.name && !errors.phone;

  const submit = async () => {
    setTouched(true);
    if (!valid || !user) return;
    setLoading(true);
    setSubmitError(null);
    try {
      const updated = await updateProfile(user.id, { name: name.trim(), phone: phone.trim() });
      patchUser({ name: updated.name, phone: updated.phone });
      showMessage("Đã lưu", "Thông tin hồ sơ đã được cập nhật.", () => navigation.goBack());
    } catch (e) {
      setSubmitError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="✎ Chỉnh sửa hồ sơ" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <FormField label="Email" value={user?.email ?? ""} editable={false} />
          <FormField label="Họ tên" value={name} onChangeText={setName} error={touched ? errors.name : null} autoCapitalize="words" />
          <FormField label="Số điện thoại" value={phone} onChangeText={setPhone} error={touched ? errors.phone : null} keyboardType="phone-pad" />
        </View>
        {submitError ? <Text style={styles.error}>{submitError}</Text> : null}
        <PrimaryButton title="Lưu thay đổi" onPress={submit} loading={loading} disabled={!valid} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 8, paddingBottom: 40 },
  card: { backgroundColor: colors.card, borderRadius: radius.md, padding: 14, borderWidth: 1, borderColor: colors.line },
  error: { color: colors.danger, fontWeight: "700", textAlign: "center" },
});

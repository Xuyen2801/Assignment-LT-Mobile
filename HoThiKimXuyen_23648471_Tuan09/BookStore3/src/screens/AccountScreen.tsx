import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TabScreenProps } from "../navigation/types";
import { Header } from "../components/Header";
import { MenuItem } from "../components/MenuItem";
import { PrimaryButton } from "../components/PrimaryButton";
import { useAuth } from "../store/hooks";
import { colors, radius } from "../theme";

export function AccountScreen({ navigation }: TabScreenProps<"Account">) {
  const { user, isLoggedIn, signOut } = useAuth();

  const logout = () => {
    signOut();
  };

  return (
    <View style={styles.container}>
      <Header title="👤 Tài khoản" />
      <ScrollView contentContainerStyle={styles.content}>
        {isLoggedIn && user ? (
          <View style={styles.card}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user.name.charAt(0).toUpperCase()}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.email}>{user.email}</Text>
              {user.phone ? <Text style={styles.phone}>📞 {user.phone}</Text> : null}
            </View>
            <Text style={styles.edit} onPress={() => navigation.navigate("EditProfile")}>
              ✎
            </Text>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.guest}>Bạn chưa đăng nhập</Text>
            <View style={{ flexDirection: "row", gap: 10, marginTop: 12 }}>
              <View style={{ flex: 1 }}>
                <PrimaryButton title="Đăng nhập" onPress={() => navigation.navigate("Login")} />
              </View>
              <View style={{ flex: 1 }}>
                <PrimaryButton title="Đăng ký" variant="outline" onPress={() => navigation.navigate("Register")} />
              </View>
            </View>
          </View>
        )}

        <MenuItem emoji="🧾" label="Đơn hàng của tôi" onPress={() => navigation.navigate("Orders")} />
        <MenuItem emoji="🔔" label="Thông báo" onPress={() => navigation.navigate("Notifications")} />
        <MenuItem emoji="❤️" label="Yêu thích" onPress={() => navigation.navigate("Wishlist")} />
        {isLoggedIn && <MenuItem emoji="🚪" label="Đăng xuất" danger onPress={logout} />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 12, paddingBottom: 30 },
  card: { backgroundColor: colors.card, borderRadius: radius.lg, padding: 16, marginBottom: 10, flexDirection: "row", alignItems: "center", gap: 12, borderWidth: 1, borderColor: colors.line },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.indigo, alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#fff", fontSize: 22, fontWeight: "800" },
  name: { fontSize: 17, fontWeight: "800", color: colors.text },
  email: { color: colors.muted, marginTop: 2 },
  phone: { color: colors.muted, marginTop: 2 },
  edit: { fontSize: 22, color: colors.indigo, padding: 6 },
  guest: { fontSize: 16, fontWeight: "700", color: colors.text, textAlign: "center" },
});

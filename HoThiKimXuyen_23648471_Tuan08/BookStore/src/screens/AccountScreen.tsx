import { StyleSheet, Text, View } from "react-native";

export function AccountScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tài khoản</Text>
      <Text style={styles.subtitle}>Thông tin người dùng sẽ hiển thị ở đây.</Text>
    </View>
  );
}

export default AccountScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16 },
  title: { fontSize: 22, fontWeight: "600", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#666" },
});
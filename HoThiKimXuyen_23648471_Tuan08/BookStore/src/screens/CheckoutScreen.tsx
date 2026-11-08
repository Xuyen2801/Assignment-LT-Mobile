import { StyleSheet, Text, View } from "react-native";
import type { RootScreenProps } from "../navigation/types";

export function CheckoutScreen({ route }: RootScreenProps<"Checkout">) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Thanh toán: {route.params.total.toLocaleString("vi-VN")} đ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18 },
});
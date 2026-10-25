import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>Có lỗi xảy ra</Text>
      <Text style={styles.message}>{message}</Text>
      <Pressable style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>THỬ LẠI</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 10 },
  title: { fontSize: 18, fontWeight: "700", color: colors.text },
  message: { fontSize: 14, color: colors.muted, textAlign: "center" },
  button: { marginTop: 8, backgroundColor: colors.red, borderRadius: 4, paddingHorizontal: 24, paddingVertical: 10 },
  buttonText: { color: "#fff", fontWeight: "700" },
});
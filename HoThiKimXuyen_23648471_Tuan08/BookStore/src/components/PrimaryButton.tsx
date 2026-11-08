import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme";

interface Props {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

export function PrimaryButton({ title, onPress, loading = false }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={[styles.btn, loading && styles.disabled]}
    >
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.text}>{title}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 4,
  },
  disabled: { opacity: 0.6 },
  text: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
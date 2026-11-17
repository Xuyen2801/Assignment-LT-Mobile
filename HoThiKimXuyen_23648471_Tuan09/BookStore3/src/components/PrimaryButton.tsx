import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme";

interface Props {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "outline";
}

export function PrimaryButton({ title, onPress, loading = false, disabled = false, variant = "primary" }: Props) {
  const off = loading || disabled;
  return (
    <Pressable
      onPress={onPress}
      disabled={off}
      style={[
        styles.btn,
        variant === "outline" && styles.outline,
        off && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === "outline" ? colors.indigo : "#fff"} />
      ) : (
        <Text style={[styles.text, variant === "outline" && styles.outlineText]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.indigo,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 4,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: colors.indigo,
  },
  disabled: { opacity: 0.5 },
  text: { color: "#fff", fontWeight: "700", fontSize: 16 },
  outlineText: { color: colors.indigo },
});

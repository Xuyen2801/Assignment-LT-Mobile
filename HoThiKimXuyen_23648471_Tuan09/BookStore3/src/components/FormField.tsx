import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../theme";

interface Props extends React.ComponentProps<typeof TextInput> {
  label: string;
  error?: string | null;
}

export function FormField({ label, error, style, ...rest }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        {...rest}
        style={[styles.input, error ? styles.inputError : null, style]}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 14 },
  label: { fontWeight: "600", marginBottom: 6, color: colors.navy },
  input: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    padding: 12,
    backgroundColor: colors.card,
    color: colors.text,
  },
  inputError: { borderColor: colors.danger },
  error: { color: colors.danger, marginTop: 4, fontSize: 13 },
});

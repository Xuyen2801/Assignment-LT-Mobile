import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius } from "../theme";

interface Props {
  label: string;
  hint?: string;
  selected: boolean;
  onPress: () => void;
}

export function PaymentOption({ label, hint, selected, onPress }: Props) {
  return (
    <Pressable style={[styles.card, selected && styles.cardActive]} onPress={onPress}>
      <View style={[styles.radio, selected && styles.radioActive]}>
        {selected ? <View style={styles.radioDot} /> : null}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.line,
    padding: 14,
    marginBottom: 10,
  },
  cardActive: { borderColor: colors.indigo, backgroundColor: "#EEF0FF" },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.muted,
    alignItems: "center",
    justifyContent: "center",
  },
  radioActive: { borderColor: colors.indigo },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.indigo },
  label: { fontWeight: "700", color: colors.text },
  hint: { color: colors.muted, fontSize: 12, marginTop: 2 },
});

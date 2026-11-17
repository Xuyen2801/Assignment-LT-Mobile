import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius } from "../theme";

interface Props {
  emoji: string;
  label: string;
  onPress: () => void;
  danger?: boolean;
}

export function MenuItem({ emoji, label, onPress, danger }: Props) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={[styles.label, danger && { color: colors.danger }]}>{label}</Text>
      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: radius.md,
    marginHorizontal: 12,
    marginVertical: 5,
    gap: 12,
  },
  emoji: { fontSize: 22 },
  label: { flex: 1, fontSize: 16, fontWeight: "700", color: colors.text },
  arrow: { fontSize: 22, color: colors.muted },
});

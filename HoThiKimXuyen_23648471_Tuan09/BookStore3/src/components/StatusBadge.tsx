import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { OrderStatus } from "../types";
import { colors, radius } from "../theme";

const MAP: Record<OrderStatus, { label: string; bg: string; fg: string }> = {
  pending: { label: "Chờ xác nhận", bg: "#FEF3C7", fg: "#B45309" },
  shipping: { label: "Đang giao", bg: "#DBEAFE", fg: "#1D4ED8" },
  completed: { label: "Hoàn tất", bg: "#DCFCE7", fg: "#15803D" },
  cancelled: { label: "Đã huỷ", bg: "#FEE2E2", fg: "#B91C1C" },
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  const s = MAP[status] ?? MAP.pending;
  return (
    <View style={[styles.badge, { backgroundColor: s.bg }]}>
      <Text style={[styles.text, { color: s.fg }]}>{s.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.pill, alignSelf: "flex-start" },
  text: { fontSize: 12, fontWeight: "800" },
});

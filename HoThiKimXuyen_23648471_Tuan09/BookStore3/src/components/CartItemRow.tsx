import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CartItem } from "../types";
import { colors, formatPrice, radius } from "../theme";

interface Props {
  item: CartItem;
  onQtyChange?: (bookId: number, quantity: number) => void;
  onRemove?: (bookId: number) => void;
}

export function CartItemRow({ item, onQtyChange, onRemove }: Props) {
  return (
    <View style={styles.row}>
      <View style={[styles.cover, { backgroundColor: item.color }]}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <View style={styles.qtyRow}>
          <Pressable style={styles.qtyBtn} onPress={() => onQtyChange?.(item.bookId, item.quantity - 1)}>
            <Text style={styles.qtyBtnText}>−</Text>
          </Pressable>
          <Text style={styles.qty}>{item.quantity}</Text>
          <Pressable style={styles.qtyBtn} onPress={() => onQtyChange?.(item.bookId, item.quantity + 1)}>
            <Text style={styles.qtyBtnText}>+</Text>
          </Pressable>
          <Pressable onPress={() => onRemove?.(item.bookId)} hitSlop={6}>
            <Text style={styles.remove}>Xoá</Text>
          </Pressable>
        </View>
      </View>
      <Text style={styles.subtotal}>{formatPrice(item.price * item.quantity)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", backgroundColor: colors.card, borderRadius: radius.md, padding: 10, marginHorizontal: 12, marginVertical: 5, gap: 10 },
  cover: { width: 54, height: 72, borderRadius: radius.sm, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 26 },
  info: { flex: 1 },
  title: { fontWeight: "700", color: colors.text },
  price: { color: colors.indigo, fontWeight: "800", marginTop: 4 },
  qtyRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 8 },
  qtyBtn: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center" },
  qtyBtnText: { fontSize: 16, fontWeight: "800", color: colors.navy },
  qty: { fontWeight: "800", color: colors.navy, minWidth: 16, textAlign: "center" },
  remove: { color: colors.danger, fontWeight: "700", fontSize: 13 },
  subtotal: { fontWeight: "800", color: colors.navy, fontSize: 14 },
});

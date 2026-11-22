import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../navigation";
import { BOOKS } from "../data/books";
import { formatPrice } from "../utils";
import { colors } from "../theme";
import { useAppDispatch } from "../store/hook";
import { addToCart } from "../store/cartSlice";

export function DetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "Detail">>();
  const dispatch = useAppDispatch();
  const book = BOOKS.find((b) => b.id === route.params.id);

  if (!book) {
    return (
      <View style={styles.center}>
        <Text>Không tìm thấy sách.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.root} contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Image source={{ uri: book.cover }} style={styles.cover} resizeMode="cover" />
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.sub}>{book.author} · {book.category}</Text>
      <Text style={styles.price}>{formatPrice(book.price)}</Text>
      <Text style={styles.sub}>
        ⭐ {book.rating.toFixed(1)} · {book.inStock ? "✅ Còn hàng" : "❌ Hết hàng"}
      </Text>
      <Text style={styles.desc}>{book.description}</Text>

      <TouchableOpacity
        style={[styles.addBtn, !book.inStock && { opacity: 0.4 }]}
        disabled={!book.inStock}
        onPress={() => dispatch(addToCart({ id: book.id, title: book.title, price: book.price }))}
        testID="add-to-cart"
      >
        <Text style={styles.addText}>{book.inStock ? "🛒 Thêm vào giỏ" : "Hết hàng"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  cover: { width: 180, height: 270, borderRadius: 12, alignSelf: "center", backgroundColor: colors.indigo },
  title: { fontSize: 22, fontWeight: "800", color: colors.text },
  sub: { fontSize: 14, color: colors.muted },
  price: { fontSize: 18, fontWeight: "800", color: colors.indigo },
  desc: { fontSize: 15, lineHeight: 22, color: colors.text },
  addBtn: { backgroundColor: colors.indigo, paddingVertical: 14, borderRadius: 12, alignItems: "center", marginTop: 8 },
  addText: { color: "#fff", fontWeight: "800", fontSize: 16 },
});
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { PHONES } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { useFavorites } from "./FavoritesContext";
import { TabProps } from "./types";

export function FavoritesTab({ navigation }: TabProps<"Favorites">) {
  const { ids } = useFavorites();
  const favorites = PHONES.filter((p) => ids.includes(p.id));

  if (favorites.length === 0) {
    return (
      <View style={s.center}>
        <Text style={s.empty}>Chưa có sản phẩm nào được lưu.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => (
        <Pressable
          style={s.row}
          onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
        >
          <Text style={s.name}>{item.name.split(" - ")[0]}</Text>
          <Text style={s.price}>{formatPrice(item.price)}</Text>
        </Pressable>
      )}
    />
  );
}

const s = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  empty: { fontSize: 15, color: colors.muted, textAlign: "center" },
  row: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 14,
  },
  name: { fontSize: 15, fontWeight: "600", color: colors.text },
  price: { fontSize: 13, color: colors.red, marginTop: 4 },
});
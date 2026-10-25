import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { PHONES } from "../data/phones";
import { Phone } from "../types";
import { colors, formatPrice } from "../theme";
import { TabProps } from "./types";

function ProductRow({ phone, onPress }: { phone: Phone; onPress: () => void }) {
  return (
    <Pressable style={s.row} onPress={onPress}>
      <Text style={s.name}>{phone.name.split(" - ")[0]}</Text>
      <Text style={s.price}>{formatPrice(phone.price)}</Text>
    </Pressable>
  );
}

export function ProductsTab({ navigation }: TabProps<"Products">) {
  return (
    <FlatList
      data={PHONES}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => (
        <ProductRow
          phone={item}
          onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
        />
      )}
    />
  );
}

const s = StyleSheet.create({
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
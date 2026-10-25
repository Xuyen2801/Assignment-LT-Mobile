import React from "react";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { PHONE_COLORS, PHONES } from "../data/phones";
import { Stars } from "../components/Stars";
import { colors, formatPrice } from "../theme";
import { useFavorites } from "./FavoritesContext";
import { RootProps } from "./types";

export function ProductDetailsScreen({ route }: RootProps<"ProductDetails">) {
  const { id } = route.params;
  const phone = PHONES.find((p) => p.id === id);
  const { has, toggle } = useFavorites();

  if (!phone) {
    return (
      <SafeAreaView style={s.center}>
        <Text style={s.notFound}>Không tìm thấy sản phẩm #{id}</Text>
      </SafeAreaView>
    );
  }

  const liked = has(phone.id);

  return (
    <SafeAreaView style={s.root}>
      <View style={s.imageWrap}>
        <Image
          source={PHONE_COLORS[phone.defaultColor].image}
          style={s.image}
          resizeMode="contain"
        />
      </View>

      <View style={s.info}>
        <Text style={s.name}>{phone.name}</Text>
        <Stars value={phone.rating} />
        <Text style={s.price}>{formatPrice(phone.price)}</Text>
        <Text style={s.supplier}>Cung cấp bởi {phone.supplier}</Text>

        <Pressable
          style={[s.likeBtn, liked && s.likeBtnOn]}
          onPress={() => toggle(phone.id)}
        >
          <Text style={[s.likeText, liked && s.likeTextOn]}>
            {liked ? "♥ Đã lưu" : "♡ Lưu vào yêu thích"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff", padding: 16 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  notFound: { fontSize: 16, color: colors.muted, textAlign: "center" },
  imageWrap: { flex: 1, alignItems: "center", justifyContent: "center" },
  image: { width: 220, height: 320 },
  info: { gap: 8, paddingBottom: 12 },
  name: { fontSize: 16, fontWeight: "600", color: colors.text },
  price: { fontSize: 18, fontWeight: "700", color: colors.red },
  supplier: { fontSize: 13, color: colors.muted },
  likeBtn: {
    borderWidth: 1,
    borderColor: colors.red,
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },
  likeBtnOn: { backgroundColor: colors.red },
  likeText: { fontSize: 15, fontWeight: "600", color: colors.red },
  likeTextOn: { color: "#fff" },
});
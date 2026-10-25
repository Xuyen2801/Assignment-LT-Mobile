import React, { useState } from "react";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { COLOR_ORDER, PHONE_COLORS } from "../data/phones";
import { ColorKey, Phone } from "../types";
import { colors, formatPrice } from "../theme";
import type { SelectPhoneParamList } from "./SelectPhoneApp";

type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor"> & { phone: Phone };

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  // Màu đang chọn. Lấy giá trị ban đầu từ màn Product (nếu đã chọn trước đó).
  const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
  const [line1, line2] = phone.name.split(" - ");   // "Điện Thoại Vsmart Joy 3" / "Hàng chính hãng"

  return (
    <SafeAreaView style={styles.root}>
      {/* Nửa trên: nền trắng */}
      <View style={styles.header}>
        <Image
          source={PHONE_COLORS[picked ?? phone.defaultColor].image}
          style={styles.thumb}
          resizeMode="contain"
        />
        <View style={styles.headerText}>
          <Text style={styles.small}>{line1}</Text>
          <Text style={styles.small}>{line2}</Text>

          {/* TODO 3: chỉ hiện khi đã chọn màu */}
          {picked && (
            <>
              <Text style={styles.bold}>Màu: {PHONE_COLORS[picked].label}</Text>
              <Text style={styles.bold}>Cung cấp bởi {phone.supplier}</Text>
              <Text style={styles.bold}>{formatPrice(phone.price)}</Text>
            </>
          )}
        </View>
      </View>

      {/* Nửa dưới: nền xám */}
      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>

        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => (
            <Pressable
              key={key}
              onPress={() => setPicked(key)}
              style={[
                styles.swatch,
                { backgroundColor: PHONE_COLORS[key].hex },
                picked === key && styles.swatchOn,
              ]}
            />
          ))}
        </View>

        {/* TODO 4: nút XONG, gửi màu đã chọn về màn Product */}
        <Pressable
          style={styles.doneBtn}
          onPress={() => navigation.navigate("Product", { color: picked }, { merge: true })}
        >
          <Text style={styles.doneText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 16,
    backgroundColor: "#fff",
  },
  thumb: { width: 110, height: 150 },
  headerText: { flex: 1, gap: 4 },
  small: { fontSize: 14, color: colors.text },
  bold: { fontSize: 14, fontWeight: "700", color: colors.text },
  body: {
    flex: 1,
    backgroundColor: colors.grey,
    padding: 20,
  },
  hint: { fontSize: 14, color: colors.text, marginBottom: 16 },
  swatches: { gap: 12, alignItems: "flex-start" },
  swatch: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "transparent",
  },
  swatchOn: { borderWidth: 3, borderColor: colors.text },
  doneBtn: {
    marginTop: "auto",
    backgroundColor: colors.blue,
    borderRadius: 4,
    paddingVertical: 14,
    alignItems: "center",
  },
  doneText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
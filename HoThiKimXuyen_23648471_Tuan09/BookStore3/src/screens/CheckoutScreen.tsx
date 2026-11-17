import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { RootScreenProps } from "../navigation/types";
import { FormField } from "../components/FormField";
import { PaymentOption } from "../components/PaymentOption";
import { PrimaryButton } from "../components/PrimaryButton";
import { EmptyState } from "../components/EmptyState";
import { useCart, useAuth } from "../store/hooks";
import { createOrder } from "../services/orderService";
import { validateRequired, validatePhone } from "../utils/validators";
import { getErrorMessage } from "../api/client";
import { showMessage } from "../utils/dialog";
import { PaymentMethod } from "../types";
import { colors, formatPrice, radius } from "../theme";

export function CheckoutScreen({ navigation }: RootScreenProps<"Checkout">) {
  const { items, totalPrice, clear } = useCart();
  const { user, isLoggedIn } = useAuth();

  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const errors = {
    name: validateRequired("họ tên người nhận")(name),
    phone: validatePhone(phone),
    address: validateRequired("địa chỉ giao hàng")(address),
  };
  const valid = !errors.name && !errors.phone && !errors.address && items.length > 0;

  const submit = async () => {
    setTouched(true);
    if (!valid || !user) return;
    setLoading(true);
    setSubmitError(null);
    try {
      await createOrder({
        userId: user.id,
        items: items.map((i) => ({ bookId: i.bookId, title: i.title, price: i.price, quantity: i.quantity })),
        total: totalPrice,
        address: { name: name.trim(), phone: phone.trim(), address: address.trim() },
        paymentMethod: payment,
      });
      clear();
      showMessage("Đặt hàng thành công 🎉", "Cảm ơn bạn đã mua sắm tại BookStore!", () =>
        navigation.navigate("Tabs", { screen: "Home" })
      );
    } catch (e) {
      setSubmitError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyState
          emoji="🧾"
          title="Chưa có sản phẩm nào"
          message="Giỏ hàng đang trống."
          actionLabel="Mua sắm ngay"
          onAction={() => navigation.navigate("Tabs", { screen: "Home" })}
        />
      </View>
    );
  }

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <EmptyState
          emoji="🔒"
          title="Đăng nhập để đặt hàng"
          message="Bạn cần đăng nhập để lưu đơn hàng của mình."
          actionLabel="Đăng nhập"
          onAction={() => navigation.navigate("Login", { redirectTo: "Checkout" })}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.h}>Đơn hàng của bạn</Text>
      <View style={styles.card}>
        {items.map((i) => (
          <View key={i.bookId} style={styles.itemRow}>
            <Text style={styles.itemTitle} numberOfLines={1}>
              {i.emoji} {i.title} × {i.quantity}
            </Text>
            <Text style={styles.itemPrice}>{formatPrice(i.price * i.quantity)}</Text>
          </View>
        ))}
        <View style={[styles.itemRow, { borderTopWidth: 1, borderTopColor: colors.line, paddingTop: 10, marginTop: 4 }]}>
          <Text style={styles.totalLabel}>Tổng cộng</Text>
          <Text style={styles.totalValue}>{formatPrice(totalPrice)}</Text>
        </View>
      </View>

      <Text style={styles.h}>Địa chỉ giao hàng</Text>
      <View style={styles.card}>
        <FormField label="Họ tên người nhận" value={name} onChangeText={setName} error={touched ? errors.name : null} autoCapitalize="words" />
        <FormField label="Số điện thoại" value={phone} onChangeText={setPhone} error={touched ? errors.phone : null} keyboardType="phone-pad" />
        <FormField
          label="Địa chỉ"
          value={address}
          onChangeText={setAddress}
          error={touched ? errors.address : null}
          autoCapitalize="sentences"
          placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
        />
      </View>

      <Text style={styles.h}>Phương thức thanh toán</Text>
      <View style={styles.card}>
        <PaymentOption label="Thanh toán khi nhận hàng (COD)" selected={payment === "cod"} onPress={() => setPayment("cod")} />
        <PaymentOption label="Chuyển khoản ngân hàng" hint="Chỉ minh hoạ giao diện" selected={payment === "bank"} onPress={() => setPayment("bank")} />
      </View>

      {submitError ? <Text style={styles.submitError}>{submitError}</Text> : null}

      <PrimaryButton title="Xác nhận đặt hàng" onPress={submit} loading={loading} disabled={!valid} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 4, paddingBottom: 40 },
  h: { fontSize: 16, fontWeight: "800", color: colors.text, marginTop: 14, marginBottom: 8 },
  card: { backgroundColor: colors.card, borderRadius: radius.md, padding: 14, borderWidth: 1, borderColor: colors.line },
  itemRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 4, gap: 10 },
  itemTitle: { flex: 1, color: colors.text, fontWeight: "600" },
  itemPrice: { color: colors.indigo, fontWeight: "800" },
  totalLabel: { fontWeight: "800", color: colors.navy, fontSize: 16 },
  totalValue: { fontWeight: "800", color: colors.indigo, fontSize: 18 },
  submitError: { color: colors.danger, fontWeight: "700", textAlign: "center", marginVertical: 10 },
});

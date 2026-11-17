import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { RootScreenProps } from "../navigation/types";
import { Header } from "../components/Header";
import { StatusBadge } from "../components/StatusBadge";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { PrimaryButton } from "../components/PrimaryButton";
import { getOrdersByUser } from "../services/orderService";
import { getErrorMessage } from "../api/client";
import { showMessage } from "../utils/dialog";
import { useAuth, useCart } from "../store/hooks";
import { Order, OrderStatus } from "../types";
import { colors, formatPrice, radius } from "../theme";
import { formatDateTime } from "../utils/format";

const FILTERS: { key: OrderStatus | "all"; label: string }[] = [
  { key: "all", label: "Tất cả" },
  { key: "pending", label: "Chờ xác nhận" },
  { key: "shipping", label: "Đang giao" },
  { key: "completed", label: "Hoàn tất" },
  { key: "cancelled", label: "Đã huỷ" },
];

export function OrdersScreen({ navigation }: RootScreenProps<"Orders">) {
  const { user, isLoggedIn } = useAuth();
  const { add } = useCart();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      setOrders(await getOrdersByUser(user.id));
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  const visible = useMemo(
    () => (statusFilter === "all" ? orders : orders.filter((o) => o.status === statusFilter)),
    [orders, statusFilter]
  );

  const reorder = (order: Order) => {
    order.items.forEach((i) =>
      add({
        bookId: i.bookId,
        title: i.title,
        price: i.price,
        emoji: "📕",
        color: "#E2E8F0",
        stock: 999,
      })
    );
  };

  if (!isLoggedIn || !user) {
    return (
      <View style={styles.container}>
        <Header title="🧾 Đơn hàng của tôi" />
        <EmptyState
          emoji="🔒"
          title="Đăng nhập để xem đơn hàng"
          actionLabel="Đăng nhập"
          onAction={() => navigation.navigate("Login", { redirectTo: "Orders" })}
        />
      </View>
    );
  }

  if (loading) return <LoadingView label="Đang tải đơn hàng…" />;
  if (error) return <ErrorView message={error} onRetry={load} />;

  return (
    <View style={styles.container}>
      <Header title="🧾 Đơn hàng của tôi" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
        {FILTERS.map((f) => {
          const active = statusFilter === f.key;
          return (
            <Pressable key={f.key} style={[styles.filterChip, active && styles.filterChipActive]} onPress={() => setStatusFilter(f.key)}>
              <Text style={[styles.filterText, active && styles.filterTextActive]}>{f.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {visible.length === 0 && (
          <EmptyState
            emoji="📦"
            title={orders.length === 0 ? "Bạn chưa có đơn hàng nào" : "Không có đơn hàng ở trạng thái này"}
            message={orders.length === 0 ? "Đặt hàng ngay để thấy đơn của mình ở đây." : undefined}
            actionLabel={orders.length === 0 ? "Mua sắm ngay" : undefined}
            onAction={orders.length === 0 ? () => navigation.navigate("Tabs", { screen: "Home" }) : undefined}
          />
        )}
        {visible.map((o) => {
          const open = openId === o.id;
          return (
            <Pressable key={o.id} style={styles.card} onPress={() => setOpenId(open ? null : o.id)}>
              <View style={styles.cardHead}>
                <View>
                  <Text style={styles.orderId}>Đơn #{o.id}</Text>
                  <Text style={styles.date}>{formatDateTime(o.createdAt)}</Text>
                </View>
                <StatusBadge status={o.status} />
              </View>
              <Text style={styles.summary}>
                {o.items.reduce((n, i) => n + i.quantity, 0)} sản phẩm · {formatPrice(o.total)}
              </Text>
              {open && (
                <View style={styles.detail}>
                  {o.items.map((i) => (
                    <View key={i.bookId} style={styles.itemRow}>
                      <Text style={styles.itemTitle} numberOfLines={1}>
                        {i.title} × {i.quantity}
                      </Text>
                      <Text style={styles.itemPrice}>{formatPrice(i.price * i.quantity)}</Text>
                    </View>
                  ))}
                  <Text style={styles.addr}>
                    📍 {o.address.name} · {o.address.phone} · {o.address.address}
                  </Text>
                  <Text style={styles.pay}>
                    {o.paymentMethod === "cod" ? "Thanh toán khi nhận hàng (COD)" : "Chuyển khoản ngân hàng"}
                  </Text>
                  {o.status === "completed" && (
                    <PrimaryButton
                      title="🛒 Mua lại đơn này"
                      variant="outline"
                      onPress={() => {
                        reorder(o);
                        showMessage("Đã thêm vào giỏ", "Các sản phẩm đã được thêm lại vào giỏ hàng.", () =>
                          navigation.navigate("Tabs", { screen: "Cart" })
                        );
                      }}
                    />
                  )}
                </View>
              )}
              <Text style={styles.toggle}>{open ? "▲ Thu gọn" : "▼ Xem chi tiết"}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  filterRow: { paddingHorizontal: 12, paddingVertical: 10, gap: 8 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.line },
  filterChipActive: { backgroundColor: colors.indigo, borderColor: colors.indigo },
  filterText: { fontWeight: "700", color: colors.text, fontSize: 13 },
  filterTextActive: { color: "#fff" },
  card: { backgroundColor: colors.card, borderRadius: radius.md, marginHorizontal: 12, marginVertical: 6, padding: 14, borderWidth: 1, borderColor: colors.line },
  cardHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 10 },
  orderId: { fontWeight: "800", color: colors.text, fontSize: 16 },
  date: { color: colors.muted, fontSize: 12, marginTop: 2 },
  summary: { color: colors.muted, marginTop: 6 },
  detail: { marginTop: 12, borderTopWidth: 1, borderTopColor: colors.line, paddingTop: 10, gap: 6 },
  itemRow: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
  itemTitle: { flex: 1, color: colors.text },
  itemPrice: { color: colors.indigo, fontWeight: "700" },
  addr: { color: colors.muted, marginTop: 4 },
  pay: { color: colors.muted, marginBottom: 6 },
  toggle: { color: colors.indigo, fontWeight: "700", marginTop: 10, textAlign: "center" },
});

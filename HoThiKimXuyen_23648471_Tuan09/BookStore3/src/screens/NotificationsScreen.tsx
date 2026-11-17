import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { RootScreenProps } from "../navigation/types";
import { Header } from "../components/Header";
import { NotificationItem } from "../components/NotificationItem";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getNotifications, markAsRead } from "../services/notificationService";
import { getErrorMessage } from "../api/client";
import { useAuth } from "../store/hooks";
import { AppNotification } from "../types";
import { colors } from "../theme";

export function NotificationsScreen({ navigation }: RootScreenProps<"Notifications">) {
  const { user, isLoggedIn } = useAuth();
  const [items, setItems] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      setItems(await getNotifications(user.id));
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  const open = async (n: AppNotification) => {
    // Optimistic: đổi trạng thái ngay trên UI, gọi API sau
    setItems((prev) => prev.map((i) => (i.id === n.id ? { ...i, read: true } : i)));
    try {
      await markAsRead(n.id);
    } catch {
      // lỗi đánh dấu đã đọc không chặn điều hướng
    }
    if (n.target?.screen === "Orders") {
      navigation.navigate("Orders");
    } else if (n.target?.screen === "BookDetail" && n.target.bookId) {
      navigation.navigate("BookDetail", { bookId: n.target.bookId });
    }
  };

  if (!isLoggedIn || !user) {
    return (
      <View style={styles.container}>
        <Header title="🔔 Thông báo" />
        <EmptyState
          emoji="🔒"
          title="Đăng nhập để xem thông báo"
          actionLabel="Đăng nhập"
          onAction={() => navigation.navigate("Login", { redirectTo: "Notifications" })}
        />
      </View>
    );
  }

  if (loading) return <LoadingView label="Đang tải thông báo…" />;
  if (error) return <ErrorView message={error} onRetry={load} />;

  return (
    <View style={styles.container}>
      <Header title="🔔 Thông báo" />
      <FlatList
        data={items}
        keyExtractor={(n) => String(n.id)}
        renderItem={({ item }) => <NotificationItem item={item} onPress={open} />}
        contentContainerStyle={{ paddingVertical: 8, flexGrow: 1 }}
        ListEmptyComponent={
          <EmptyState emoji="🔕" title="Chưa có thông báo nào" message="Thông báo mới sẽ xuất hiện ở đây." />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
});

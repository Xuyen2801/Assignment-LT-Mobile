import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Header } from "../components/Header";
import { BookGrid } from "../components/BookGrid";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getBooks } from "../services/bookService";
import { getErrorMessage } from "../api/client";
import { useWishlist } from "../store/hooks";
import { RootScreenProps } from "../navigation/types";
import { Book } from "../types";
import { colors } from "../theme";

export function WishlistScreen({ navigation }: RootScreenProps<"Wishlist">) {
  const { ids } = useWishlist();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const all = await getBooks();
      setBooks(all.filter((b) => ids.includes(b.id)));
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids]);

  if (loading) return <LoadingView label="Đang tải yêu thích…" />;
  if (error) return <ErrorView message={error} onRetry={load} />;

  return (
    <View style={styles.container}>
      <Header title="❤️ Yêu thích" />
      <BookGrid
        data={books}
        onPressBook={(b) => navigation.navigate("BookDetail", { bookId: b.id })}
        bottomSpace={30}
        ListEmptyComponent={
          <EmptyState
            emoji="🤍"
            title="Chưa có sách yêu thích"
            message="Bấm ♥ ở trang chi tiết sách để lưu lại."
            actionLabel="Khám phá sách"
            onAction={() => navigation.navigate("Tabs", { screen: "Home" })}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
});

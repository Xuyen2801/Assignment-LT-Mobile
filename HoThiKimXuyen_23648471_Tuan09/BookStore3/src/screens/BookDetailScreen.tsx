import React, { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { RootScreenProps } from "../navigation/types";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { RatingStars } from "../components/RatingStars";
import { getBookById } from "../services/bookService";
import { getReviewsByBook, addReview } from "../services/reviewService";
import { getErrorMessage } from "../api/client";
import { showMessage } from "../utils/dialog";
import { useCart, useWishlist, useAuth } from "../store/hooks";
import { Book, Review } from "../types";
import { colors, formatPrice, radius } from "../theme";
import { formatDate } from "../utils/format";

export function BookDetailScreen({ route, navigation }: RootScreenProps<"BookDetail">) {
  const { bookId } = route.params;
  const { add } = useCart();
  const { isFavorite, toggle } = useWishlist();
  const { user, isLoggedIn } = useAuth();

  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [b, r] = await Promise.all([getBookById(bookId), getReviewsByBook(bookId)]);
      setBook(b);
      setReviews(r);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    load();
  }, [load]);

  const submitReview = async () => {
    if (!user) {
      navigation.navigate("Login", { redirectTo: "BookDetail", bookId });
      return;
    }
    if (!comment.trim()) {
      showMessage("Thiếu đánh giá", "Hãy viết vài dòng cảm nhận của bạn.");
      return;
    }
    setSubmitting(true);
    try {
      await addReview({
        bookId: bookId,
        userId: user.id,
        userName: user.name,
        rating,
        comment: comment.trim(),
      });
      setComment("");
      setRating(5);
      const r = await getReviewsByBook(bookId);
      setReviews(r);
      showMessage("Đã gửi đánh giá", "Cảm ơn bạn đã chia sẻ!");
    } catch (e) {
      showMessage("Không gửi được", getErrorMessage(e));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingView />;
  if (error || !book) return <ErrorView message={error ?? "Không tìm thấy sách."} onRetry={load} />;

  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.cover, { backgroundColor: book.color }]}>
        <Text style={styles.emoji}>{book.emoji}</Text>
      </View>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{book.title}</Text>
        <Pressable onPress={() => toggle(book.id)} hitSlop={10}>
          <Text style={styles.heart}>{isFavorite(book.id) ? "♥" : "♡"}</Text>
        </Pressable>
      </View>
      <Text style={styles.author}>{book.author}</Text>
      <Text style={styles.price}>{formatPrice(book.price)}</Text>
      <Text style={styles.stock}>Còn {book.stock} cuốn</Text>
      <Text style={styles.desc}>{book.description}</Text>

      <View style={styles.reviewHead}>
        <Text style={styles.h}>Đánh giá ({reviews.length})</Text>
        {reviews.length > 0 && (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <RatingStars value={avg} />
            <Text style={styles.avg}>{avg.toFixed(1)}</Text>
          </View>
        )}
      </View>

      {reviews.map((r) => (
        <View key={r.id} style={styles.reviewCard}>
          <View style={styles.reviewTop}>
            <Text style={styles.reviewName}>{r.userName}</Text>
            <RatingStars value={r.rating} size={13} />
          </View>
          <Text style={styles.reviewComment}>{r.comment}</Text>
          <Text style={styles.reviewDate}>{formatDate(r.createdAt)}</Text>
        </View>
      ))}
      {reviews.length === 0 && <Text style={styles.noReview}>Chưa có đánh giá nào — hãy là người đầu tiên!</Text>}

      <View style={styles.formCard}>
        <Text style={styles.h}>Viết đánh giá</Text>
        <RatingStars value={rating} onChange={setRating} />
        <TextInput
          style={styles.input}
          value={comment}
          onChangeText={setComment}
          placeholder="Chia sẻ cảm nhận của bạn…"
          placeholderTextColor={colors.muted}
          multiline
        />
        <Pressable style={[styles.btn, submitting && { opacity: 0.6 }]} disabled={submitting} onPress={submitReview}>
          <Text style={styles.btnText}>{submitting ? "Đang gửi…" : "Gửi đánh giá"}</Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.btn}
        onPress={() =>
          add({
            bookId: book.id,
            title: book.title,
            price: book.price,
            emoji: book.emoji,
            color: book.color,
            stock: book.stock,
          })
        }
      >
        <Text style={styles.btnText}>Thêm vào giỏ</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 8, paddingBottom: 40 },
  cover: { height: 220, borderRadius: radius.lg, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 90 },
  title: { fontSize: 22, fontWeight: "800", color: colors.text, marginTop: 8, flex: 1 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  author: { color: colors.muted, fontSize: 15 },
  price: { fontSize: 20, fontWeight: "800", color: colors.indigo },
  stock: { color: colors.muted },
  desc: { color: colors.text, lineHeight: 22, marginTop: 4 },
  h: { fontSize: 17, fontWeight: "800", color: colors.text },
  reviewHead: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 16 },
  avg: { fontWeight: "800", color: colors.text },
  reviewCard: { backgroundColor: colors.card, borderRadius: radius.md, padding: 12, marginTop: 8, borderWidth: 1, borderColor: colors.line },
  reviewTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  reviewName: { fontWeight: "700", color: colors.text },
  reviewComment: { color: colors.text, marginTop: 6, lineHeight: 20 },
  reviewDate: { color: colors.muted, fontSize: 12, marginTop: 6 },
  noReview: { color: colors.muted, marginTop: 8, fontStyle: "italic" },
  formCard: { backgroundColor: colors.card, borderRadius: radius.md, padding: 14, marginTop: 16, borderWidth: 1, borderColor: colors.line, gap: 10 },
  input: { borderWidth: 1, borderColor: colors.line, borderRadius: 10, padding: 12, minHeight: 80, textAlignVertical: "top", color: colors.text, backgroundColor: colors.bg },
  btn: { backgroundColor: colors.indigo, padding: 14, borderRadius: radius.md, alignItems: "center", marginTop: 8 },
  btnText: { color: "#fff", fontWeight: "800", fontSize: 16 },
  heart: { fontSize: 28, color: colors.heart },
});

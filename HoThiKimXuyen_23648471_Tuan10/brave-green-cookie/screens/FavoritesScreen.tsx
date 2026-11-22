import React, { useCallback, useMemo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { BOOKS } from "../data/books";
import { useAppSelector } from "../store/hook";
import { selectFavoriteIds } from "../store/favoritesSlice";
import BookCard from "../components/BookCard";
import { colors } from "../theme";

export function FavoritesScreen({ navigation }: { navigation: any }) {
  const ids = useAppSelector(selectFavoriteIds);

  const favorites = useMemo(() => BOOKS.filter((b) => ids.includes(b.id)), [ids]);

  const onSelect = useCallback((id: string) => navigation.navigate("Detail", { id }), [navigation]);

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>♥ Yêu thích</Text>
      </View>
      <FlatList
        data={favorites}
        keyExtractor={(b) => b.id}
        contentContainerStyle={{ padding: 14, flexGrow: 1 }}
        renderItem={({ item }) => <BookCard book={item} layout="row" onSelect={onSelect} />}
        ListEmptyComponent={<Text style={styles.empty}>Chưa có sách yêu thích.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { backgroundColor: colors.navy, padding: 14 },
  title: { color: "#fff", fontSize: 20, fontWeight: "800" },
  empty: { textAlign: "center", color: colors.muted, marginTop: 40 },
});
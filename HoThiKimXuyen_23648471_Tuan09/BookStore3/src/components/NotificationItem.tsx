import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppNotification } from "../types";
import { colors, radius } from "../theme";
import { formatDateTime } from "../utils/format";

interface Props {
  item: AppNotification;
  onPress: (n: AppNotification) => void;
}

export function NotificationItem({ item, onPress }: Props) {
  return (
    <Pressable style={[styles.card, !item.read && styles.unread]} onPress={() => onPress(item)}>
      <View style={styles.row}>
        <Text style={styles.title}>{item.title}</Text>
        {!item.read ? <View style={styles.dot} /> : null}
      </View>
      <Text style={styles.body}>{item.body}</Text>
      <Text style={styles.time}>{formatDateTime(item.createdAt)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.card, borderRadius: radius.md, padding: 14, marginHorizontal: 12, marginVertical: 5, borderWidth: 1, borderColor: colors.line },
  unread: { backgroundColor: "#E8F6FD", borderColor: "#BDE7F5" },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  title: { fontWeight: "800", color: colors.text, flex: 1 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.danger },
  body: { color: colors.muted, marginTop: 4, lineHeight: 20 },
  time: { color: colors.muted, fontSize: 12, marginTop: 6 },
});

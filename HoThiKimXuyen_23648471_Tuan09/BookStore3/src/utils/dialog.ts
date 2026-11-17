import { Alert, Platform } from "react-native";

// Alert.alert không chạy trên bản web → dùng window.alert; onOk chạy sau khi bấm OK.
export function showMessage(title: string, message: string, onOk?: () => void) {
  if (Platform.OS === "web") {
    window.alert(`${title}\n\n${message}`);
    onOk?.();
    return;
  }
  Alert.alert(title, message, [{ text: "OK", onPress: onOk }]);
}

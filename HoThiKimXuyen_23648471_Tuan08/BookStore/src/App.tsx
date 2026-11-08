import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";

import type { RootStackParamList, TabParamList } from "./navigation/types";
import { AccountScreen } from "./screens/AccountScreen";
import { CheckoutScreen } from "./screens/CheckoutScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { LoginScreen } from "./components/LoginScreen";
import { store } from "./store";
import { colors } from "./theme";
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const headerStyle = {
  headerStyle: { backgroundColor: colors.navy },
  headerTintColor: "#fff",
};

function Tabs() {
  return (
    <Tab.Navigator screenOptions={headerStyle}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Trang chủ" }} />
      <Tab.Screen name="Account" component={AccountScreen} options={{ title: "Tài khoản" }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator screenOptions={headerStyle}>
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Đăng nhập" }} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: "Thanh toán" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
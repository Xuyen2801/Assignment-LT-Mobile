import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabNavigator } from "./TabNavigator";
import { HomeScreen } from "../screens/HomeScreen";
import { BookDetailScreen } from "../screens/BookDetailScreen";
import { CartScreen } from "../screens/CartScreen";
import { CheckoutScreen } from "../screens/CheckoutScreen";
import { OrdersScreen } from "../screens/OrdersScreen";
import { EditProfileScreen } from "../screens/EditProfileScreen";
import { NotificationsScreen } from "../screens/NotificationsScreen";
import { WishlistScreen } from "../screens/WishlistScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="Orders" component={OrdersScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Wishlist" component={WishlistScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

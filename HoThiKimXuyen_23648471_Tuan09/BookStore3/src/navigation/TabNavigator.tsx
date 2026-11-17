import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabBar, TabItem } from "../components/TabBar";
import { HomeScreen } from "../screens/HomeScreen";
import { CartScreen } from "../screens/CartScreen";
import { AccountScreen } from "../screens/AccountScreen";
import { CustomTabBar } from "./CustomTabBar";
import { TabParamList } from "./types";

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Trang chủ" }} />
      <Tab.Screen name="Cart" component={CartScreen} options={{ title: "Giỏ hàng" }} />
      <Tab.Screen name="Account" component={AccountScreen} options={{ title: "Tài khoản" }} />
    </Tab.Navigator>
  );
}

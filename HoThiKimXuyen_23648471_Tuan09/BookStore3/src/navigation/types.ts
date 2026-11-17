import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type TabParamList = {
  Home: { categoryId?: number } | undefined;
  Cart: undefined;
  Account: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  BookDetail: { bookId: number };
  Checkout: undefined;
  Orders: undefined;
  EditProfile: undefined;
  Notifications: undefined;
  Wishlist: undefined;
  Login: { redirectTo?: "Checkout" | "BookDetail" | "Orders" | "Notifications"; bookId?: number } | undefined;
  Register: undefined;
};

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  NativeStackScreenProps<RootStackParamList, "Tabs">
>;
export type RootScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

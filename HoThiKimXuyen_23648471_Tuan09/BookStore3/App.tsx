import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./src/store";
import { useAppDispatch, useAppSelector } from "./src/store/hooks";
import { hydrateCart } from "./src/store/cartSlice";
import { hydrateWishlist } from "./src/store/wishlistSlice";
import { setCredentials } from "./src/store/authSlice";
import { loadJSON } from "./src/utils/storage";
import { useAutoPersist } from "./src/hooks/useAutoPersist";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { CartItem, User } from "./src/types";

function PersistGate({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const [ready, setReady] = useState(false);

  const cartItems = useAppSelector((s) => s.cart.items);
  const wishIds = useAppSelector((s) => s.wishlist.ids);
  const user = useAppSelector((s) => s.auth.user);
  const token = useAppSelector((s) => s.auth.token);

  useEffect(() => {
    (async () => {
      const [cart, wishlist, auth] = await Promise.all([
        loadJSON<CartItem[]>("cart"),
        loadJSON<number[]>("wishlist"),
        loadJSON<{ user: User; token: string } | null>("auth"),
      ]);
      if (cart) dispatch(hydrateCart(cart));
      if (wishlist) dispatch(hydrateWishlist(wishlist));
      if (auth?.user && auth?.token) dispatch(setCredentials(auth));
      setReady(true);
    })();
  }, [dispatch]);

  useAutoPersist("cart", cartItems, ready);
  useAutoPersist("wishlist", wishIds, ready);
  useAutoPersist("auth", user && token ? { user, token } : null, ready);

  return <>{children}</>;
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <PersistGate>
            <RootNavigator />
          </PersistGate>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

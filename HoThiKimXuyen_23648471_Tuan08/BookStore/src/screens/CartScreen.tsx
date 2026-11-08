const { isLoggedIn } = useAuth();

const goCheckout = () => {
  if (isLoggedIn) {
    navigation.navigate("Checkout", { total: finalTotal });
  } else {
    navigation.navigate("Login", { redirectTo: "Checkout", total: finalTotal });
  }
};
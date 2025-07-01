import { Stack } from "expo-router";

const Layout=()=> {

  return (
    <Stack>
      <Stack.Screen
        name="welcome"
        options={{ headerShown: true, title: "Home" }}
      />
      <Stack.Screen
        name="login"
        options={{ headerShown: true, title: "auth" }}
      />
      <Stack.Screen
        name="register"
        options={{ headerShown: true, title: "main" }}
      />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}
export default Layout;
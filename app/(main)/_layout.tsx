import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{ headerShown: false, title: "Home" }}
      />
      <Stack.Screen
        name="profile"
        options={{ headerShown: false, title: "profile" }}
      />
      <Stack.Screen
        name="settings"
        options={{ headerShown: false, title: "settings" }}
      />
      <Stack.Screen
        name="notifications"
        options={{ headerShown: false, title: "notifications" }}
      />
      <Stack.Screen
        name="chatbot"
        options={{ headerShown: false, title: "chatbot" }}
      />
      <Stack.Screen
        name="dashboard"
        options={{ headerShown: false, title: "dashboard" }}
      />
      <Stack.Screen
        name="food-scanner"
        options={{ headerShown: false, title: "food-scanner" }}
      />
      <Stack.Screen
        name="forum"
        options={{ headerShown: false, title: "forum" }}
      />
      <Stack.Screen
        name="plans"
        options={{ headerShown: false, title: "plans" }}
      />
      <Stack.Screen
        name="tracker"
        options={{ headerShown: false, title: "tracker" }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};
export default RootLayout;

import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{ headerShown: true, title: "Home" }}
      />
      <Stack.Screen
        name="profile"
        options={{ headerShown: true, title: "profile" }}
      />
      <Stack.Screen
        name="settings"
        options={{ headerShown: true, title: "settings" }}
      />
      <Stack.Screen
        name="notifications"
        options={{ headerShown: true, title: "notifications" }}
      />
      <Stack.Screen
        name="chatbot"
        options={{ headerShown: true, title: "chatbot" }}
      />
      <Stack.Screen
        name="dashboard"
        options={{ headerShown: true, title: "dashboard" }}
      />
      <Stack.Screen
        name="food-scanner"
        options={{ headerShown: true, title: "food-scanner" }}
      />
      <Stack.Screen
        name="forum"
        options={{ headerShown: true, title: "forum" }}
      />
      <Stack.Screen
        name="plans"
        options={{ headerShown: true, title: "plans" }}
      />
      <Stack.Screen
        name="tracker"
        options={{ headerShown: true, title: "tracker" }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};
export default RootLayout;

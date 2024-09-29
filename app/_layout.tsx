import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{
              // Hide the header for all other routes.
              headerShown: false,
            }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="inventory" />
      <Stack.Screen name="delivery" />
    </Stack>
  );
}
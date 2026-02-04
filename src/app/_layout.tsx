import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* El (auth) agrupa login y registro */}
      <Stack.Screen name="(auth)" />
      {/* El (tabs) será tu pantalla principal post-login */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
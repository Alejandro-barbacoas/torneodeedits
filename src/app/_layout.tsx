import { AuthProvider, useAuth } from "../lib/modules/auth/AuthProvider";
import { usePushNotifications } from "../lib/core/notifications/usePushNotifications";
import { Stack } from "expo-router";

function AuthLayout() {
  const { user } = useAuth(); // Usamos 'user' que es como lo definimos en tu AuthProvider
  
  // Extraemos el ID del usuario (de Supabase)
  const userId = user?.id; 

  // 🚀 Magia: Si hay ID, se registra el token automáticamente
  usePushNotifications(userId);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="entry" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthLayout />
    </AuthProvider>
  );
}
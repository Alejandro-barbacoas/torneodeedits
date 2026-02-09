import { usePushNotifications } from "../lib/core/notifications/usePushNotifications";
import { AuthProvider, useAuth } from "../lib/modules/auth/AuthProvider";
import { Stack } from "expo-router";

function AuthLayout() {
  const { session } = useAuth();
  const userId = session?.user.id;
  usePushNotifications(userId);
  return <Stack />;
}


export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthLayout />
    </AuthProvider>
  );
}
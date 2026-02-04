import { useEffect } from 'react';
import { Platform } from 'react-native';
import { supabase } from '../../core/supabase/client.supabase';
import { NotificationAdapter } from '../../core/notifications/notification.adapter';

// 1. Setup Inicial: Configura los handlers de qué hacer cuando llega una notificación
NotificationAdapter.setup();

export const usePushNotifications = (userId?: string) => {
  useEffect(() => {
    // Si no hay usuario (ej. no ha iniciado sesión), no pedimos token
    if (!userId) return;

    const register = async () => {
      // Pedimos permiso y obtenemos el token
      const token = await NotificationAdapter.registerForPushNotificationsAsync();
      
      if (token) {
        console.log('Token obtenido:', token);
        // Guardamos o actualizamos en Supabase
        await saveTokenToDatabase(token, userId);
      }
    };

    register();
    
  }, [userId]); // Se dispara cada vez que el ID del usuario cambia
};

async function saveTokenToDatabase(token: string, userId: string) {
  const { error } = await supabase
    .from('devices') 
    .upsert({ 
      user_id: userId,
      token: token,
      platform: Platform.OS,
      last_used_at: new Date().toISOString()
    }, { onConflict: 'token' }); 

  if (error) {
    console.error('Error guardando device:', error);
  } else {
    console.log('Dispositivo registrado en Supabase ✅');
  }
}
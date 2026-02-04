import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import { getPushToken } from './../../lib/core/notifications/usePushNotifications';
import { Button } from './../../components/ui/Button';
import { useAuth } from './../../lib/modules/auth/AuthProvider';

export default function ProfileScreen() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { logout, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchToken();
  }, []);

  const fetchToken = async () => {
    setLoading(true);
    const expoToken = await getPushToken();
    if (expoToken) setToken(expoToken);
    setLoading(false);
  };

  const handleLogout = () => {
    logout();
    router.replace('./(auth)/login');
  };

  const copyToClipboard = async () => {
    if (token) {
      await Clipboard.setStringAsync(token);
      Alert.alert("Copiado", "Token copiado al portapapeles");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Usuario:</Text>
        <Text style={styles.userData}>{user?.email || 'No identificado'}</Text>
        
        <Text style={styles.label}>Tu Push Token:</Text>
        <View style={styles.tokenContainer}>
          <Text style={styles.tokenText} numberOfLines={2}>
            {token || "Cargando token..."}
          </Text>
        </View>

        <Button 
          title="Copiar Token" 
          onPress={copyToClipboard} 
          disabled={!token}
        />
      </View>

      <View style={styles.footer}>
        <Button 
          title="Cerrar Sesión" 
          onPress={handleLogout} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  userData: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  tokenContainer: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  tokenText: {
    fontSize: 12,
    color: '#444',
  },
  footer: {
    marginTop: 'auto',
    marginBottom: 20,
  }
});
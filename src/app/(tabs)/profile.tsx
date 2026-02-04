import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { getPushToken } from './../../lib/core/notifications/usePushNotifications';
import { Button } from './../../components/ui/Button';

export default function ProfileScreen() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchToken();
  }, []);

  const fetchToken = async () => {
    setLoading(true);
    const expoToken = await getPushToken();
    if (expoToken) {
      setToken(expoToken);
    }
    setLoading(false);
  };

  const copyToClipboard = async () => {
    if (token) {
      await Clipboard.setStringAsync(token);
      Alert.alert("Copiado", "Token copiado al portapapeles");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuracion de Perfil</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Estado de Notificaciones</Text>
        <Text style={styles.status}>
          {token ? "Activas" : "No configuradas"}
        </Text>
        
        <Text style={styles.label}>Tu Push Token:</Text>
        <View style={styles.tokenContainer}>
          <Text style={styles.tokenText} numberOfLines={2}>
            {token || "No disponible"}
          </Text>
        </View>

        <Button 
          title="Copiar Token" 
          onPress={copyToClipboard} 
          disabled={!token}
        />
        
        <Button 
          title="Actualizar Token" 
          onPress={fetchToken} 
          loading={loading}
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#1a1a1a',
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
    marginTop: 15,
    marginBottom: 5,
  },
  status: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 10,
  },
  tokenContainer: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  tokenText: {
    fontSize: 12,
    color: '#444',
    fontFamily: 'System',
  },
});
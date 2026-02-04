import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Clipboard, Alert } from 'react-native';
import { getPushToken } from './../../lib/core/notifications/usePushNotifications';

export default function ProfileScreen() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function loadToken() {
      const expoToken = await getPushToken();
      if (expoToken) setToken(expoToken);
    }
    loadToken();
  }, []);

  const copyToClipboard = () => {
    if (token) {
      Clipboard.setString(token);
      Alert.alert("Copiado", "El token se ha copiado al portapapeles");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Tu Expo Push Token:</Text>
        <Text style={styles.tokenText}>{token ? token : "Cargando..."}</Text>
        
        {token && (
          <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
            <Text style={styles.copyButtonText}>Copiar Token</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  infoBox: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5
  },
  tokenText: {
    fontSize: 12,
    color: '#333',
    fontWeight: 'mono'
  },
  copyButton: {
    marginTop: 15,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  copyButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
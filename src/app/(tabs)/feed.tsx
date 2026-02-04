import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function FeedScreen() {
  useEffect(() => {
    const triggerWelcomeNotification = async () => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Torneo de Edits",
          body: "¡Bienvenido! Revisa los nuevos clips de hoy.",
          data: { screen: "feed" },
        },
        trigger: null,
      });
    };

    triggerWelcomeNotification();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feed de Edits</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>Video del dia: Edit Finalista #1</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20
  },
  card: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  cardText: {
    fontSize: 16,
    color: '#333'
  }
});
import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface ToastProps {
  message: string;
  visible: boolean;
}

export const Toast = ({ message, visible }: ToastProps) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    zIndex: 999,
    elevation: 10,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
});
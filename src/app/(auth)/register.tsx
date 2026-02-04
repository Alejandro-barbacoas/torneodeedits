import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authService } from './../../lib/modules/auth/auth.service';

import { useAuth } from './../../lib/modules/auth/AuthProvider';
import { getPushToken } from './../../lib/core/notifications/usePushNotifications';
import { Button } from './../../components/ui/Button';
import { Input } from './../../components/ui/Input';
import { Toast } from './../../components/notifications/Toast';

const schema = z.object({
  email: z.string().min(1, "Requerido").email("Correo invalido"),
  password: z.string().min(6, "Minimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function RegisterScreen() {
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const { login } = useAuth();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' }
  });

  const onRegister = async (data: FormData) => {
    setLoading(true);
    try {
      await authService.signUp(data.email, data.password);
      const token = await getPushToken();
      login({ email: data.email, pushToken: token });
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        router.replace('./(tabs)/feed');
      }, 2000);
    } catch (error: any) {
      alert("Error al registrar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Toast message="¡Cuenta creada! Entrando al torneo..." visible={showToast} />
      
      <Text style={styles.title}>Torneo de Edits</Text>
      <Text style={styles.subtitle}>Crea tu cuenta para participar</Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Correo Electronico"
            placeholder="correo@ejemplo.com"
            onChangeText={onChange}
            value={value}
            error={errors.email?.message}
            autoCapitalize="none"
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Contraseña"
            placeholder="******"
            secureTextEntry
            onChangeText={onChange}
            value={value}
            error={errors.password?.message}
          />
        )}
      />

      <Button 
        title="Registrarse e Ingresar" 
        onPress={handleSubmit(onRegister)} 
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
});
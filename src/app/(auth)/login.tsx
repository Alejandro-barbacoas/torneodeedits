import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useAuth } from './../../lib/modules/auth/AuthProvider';
import { Button } from './../../components/ui/Button';
import { Input } from './../../components/ui/Input';
import { Toast } from './../../components/notifications/Toast';

const schema = z.object({
  email: z.string().min(1, "Requerido").email("Correo invalido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

type FormData = z.infer<typeof schema>;

export default function LoginScreen() {
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const { login } = useAuth();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' }
  });

  const onLogin = async (data: FormData) => {
    setLoading(true);
    
    try {
      // Aqui luego conectaremos con Supabase
      login({ email: data.email });
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        router.replace('./(tabs)/feed');
      }, 1500);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Toast message="Sesion iniciada" visible={showToast} />
      
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>Ingresa a tu cuenta de Editor</Text>

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
        title="Iniciar Sesion" 
        onPress={handleSubmit(onLogin)} 
        loading={loading}
      />

      <Link href="./(auth)/register" asChild>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>¿No tienes cuenta? Registrate</Text>
        </TouchableOpacity>
      </Link>
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
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  link: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
});
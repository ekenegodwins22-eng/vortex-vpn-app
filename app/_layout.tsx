import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { VPNProvider } from '@/context/VPNContext';

export default function RootLayout() {
  useEffect(() => {
    // Initialize app
  }, []);

  return (
    <VPNProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#000000' },
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
    </VPNProvider>
  );
}

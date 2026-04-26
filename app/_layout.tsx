import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { VPNProvider } from '@/context/VPNContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    async function prepare() {
      try {
        // Any async font loading or setup goes here
      } catch (e) {
        console.warn('Layout prepare error:', e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
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
      <StatusBar style="light" backgroundColor="#000000" />
    </VPNProvider>
  );
}

import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { VPNProvider } from '@/context/VPNContext';

// Keep splash screen visible until we explicitly hide it
SplashScreen.preventAutoHideAsync().catch(() => {
  /* ignore */
});

export default function RootLayout() {
  useEffect(() => {
    let isMounted = true;
    
    async function prepare() {
      console.log('RootLayout: Starting preparation...');
      
      // Safety timeout: Always hide splash screen after 5 seconds regardless of what happens
      const timeoutId = setTimeout(async () => {
        if (isMounted) {
          console.log('RootLayout: Preparation timeout reached, forcing splash hide');
          await SplashScreen.hideAsync().catch(() => {/* ignore */});
        }
      }, 5000);

      try {
        // You can add font loading or other initialization here
        // await Font.loadAsync({...});
        console.log('RootLayout: Preparation tasks finished');
      } catch (e) {
        console.warn('RootLayout: Preparation error:', e);
      } finally {
        clearTimeout(timeoutId);
        if (isMounted) {
          console.log('RootLayout: Hiding splash screen');
          await SplashScreen.hideAsync().catch((err) => {
            console.warn('RootLayout: Error hiding splash screen:', err);
          });
        }
      }
    }

    prepare();
    
    return () => {
      isMounted = false;
    };
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
        <Stack.Screen name="index" />
      </Stack>
      <StatusBar style="light" backgroundColor="#000000" />
    </VPNProvider>
  );
}

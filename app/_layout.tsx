import React, { useEffect, Component, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { VPNProvider } from '@/context/VPNContext';

// --- Error Boundary Component ---
interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('CRITICAL APP ERROR:', error, errorInfo);
    // Ensure splash is hidden even on crash
    SplashScreen.hideAsync().catch(() => {});
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Oops! Something went wrong.</Text>
          <Text style={styles.errorText}>{this.state.error?.message}</Text>
          <TouchableOpacity 
            style={styles.retryButton} 
            onPress={() => this.setState({ hasError: false, error: null })}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

// --- Root Layout ---

// Prevent auto-hide immediately
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  useEffect(() => {
    let isMounted = true;

    async function initApp() {
      console.log('App: Initializing...');
      
      // Force hide after 4 seconds as a fail-safe
      const failSafeTimeout = setTimeout(() => {
        if (isMounted) {
          console.log('App: Fail-safe triggered, hiding splash');
          SplashScreen.hideAsync().catch(() => {});
        }
      }, 4000);

      try {
        // Pre-load necessary assets or fonts here if needed
        console.log('App: Ready');
      } catch (e) {
        console.warn('App: Init Error', e);
      } finally {
        clearTimeout(failSafeTimeout);
        if (isMounted) {
          await SplashScreen.hideAsync().catch(() => {});
        }
      }
    }

    initApp();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <GlobalErrorBoundary>
      <VPNProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#000000' },
          }}
        >
          <Stack.Screen name="(tabs)" />
        </Stack>
        <StatusBar style="light" />
      </VPNProvider>
    </GlobalErrorBoundary>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorTitle: {
    color: '#0A84FF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0A84FF',
  },
  retryText: {
    color: '#0A84FF',
    fontWeight: 'bold',
  },
});

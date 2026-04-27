import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderTopColor: '#333',
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: '#0A84FF',
        tabBarInactiveTintColor: '#666',
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'index') {
            iconName = 'shield';
          } else if (route.name === 'servers') {
            iconName = 'globe';
          } else if (route.name === 'settings') {
            iconName = 'settings';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ color }) => {
          let label = 'Home';
          if (route.name === 'index') {
            label = 'Connect';
          } else if (route.name === 'servers') {
            label = 'Servers';
          } else if (route.name === 'settings') {
            label = 'Settings';
          }
          return <Text style={{ color, fontSize: 12 }}>{label}</Text>;
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Connect',
        }}
      />
      <Tabs.Screen
        name="servers"
        options={{
          title: 'Servers',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
        }}
      />
    </Tabs>
  );
}

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './index';
import ServersScreen from './servers';
import SettingsScreen from './settings';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
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
      <Tab.Screen name="index" component={HomeScreen} />
      <Tab.Screen name="servers" component={ServersScreen} />
      <Tab.Screen name="settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

import { Text } from 'react-native';

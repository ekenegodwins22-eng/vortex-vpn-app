import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const [autoConnect, setAutoConnect] = useState(false);
  const [killSwitch, setKillSwitch] = useState(true);
  const [splitTunneling, setSplitTunneling] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleClearCache = () => {
    Alert.alert('Clear Cache', 'Cache cleared successfully', [{ text: 'OK' }]);
  };

  const handleReset = () => {
    Alert.alert('Reset Settings', 'All settings have been reset to default', [
      { text: 'OK' },
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Connection Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connection</Text>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="flash" size={20} color="#0A84FF" />
            <View style={styles.settingText}>
              <Text style={styles.settingLabel}>Auto Connect</Text>
              <Text style={styles.settingDescription}>Connect on app launch</Text>
            </View>
          </View>
          <Switch
            value={autoConnect}
            onValueChange={setAutoConnect}
            trackColor={{ false: '#333', true: '#0A84FF' }}
            thumbColor={autoConnect ? '#00FF00' : '#666'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="shield-checkmark" size={20} color="#0A84FF" />
            <View style={styles.settingText}>
              <Text style={styles.settingLabel}>Kill Switch</Text>
              <Text style={styles.settingDescription}>Block internet if VPN disconnects</Text>
            </View>
          </View>
          <Switch
            value={killSwitch}
            onValueChange={setKillSwitch}
            trackColor={{ false: '#333', true: '#0A84FF' }}
            thumbColor={killSwitch ? '#00FF00' : '#666'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="git-branch" size={20} color="#0A84FF" />
            <View style={styles.settingText}>
              <Text style={styles.settingLabel}>Split Tunneling</Text>
              <Text style={styles.settingDescription}>Route specific apps outside VPN</Text>
            </View>
          </View>
          <Switch
            value={splitTunneling}
            onValueChange={setSplitTunneling}
            trackColor={{ false: '#333', true: '#0A84FF' }}
            thumbColor={splitTunneling ? '#00FF00' : '#666'}
          />
        </View>
      </View>

      {/* Notification Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="notifications" size={20} color="#0A84FF" />
            <View style={styles.settingText}>
              <Text style={styles.settingLabel}>Connection Alerts</Text>
              <Text style={styles.settingDescription}>Get notified on connect/disconnect</Text>
            </View>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#333', true: '#0A84FF' }}
            thumbColor={notifications ? '#00FF00' : '#666'}
          />
        </View>
      </View>

      {/* App Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Information</Text>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>App Name</Text>
          <Text style={styles.infoValue}>Vortex Shield VPN</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Version</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Build</Text>
          <Text style={styles.infoValue}>2026.04.23</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Optimization</Text>
          <Text style={styles.infoValue}>Nigeria (MTN, Airtel, Glo)</Text>
        </View>
      </View>

      {/* Security & Privacy */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security & Privacy</Text>

        <View style={styles.securityFeature}>
          <Ionicons name="lock-closed" size={18} color="#00FF00" />
          <Text style={styles.securityText}>Military-Grade Encryption (AES-256)</Text>
        </View>

        <View style={styles.securityFeature}>
          <Ionicons name="eye-off" size={18} color="#00FF00" />
          <Text style={styles.securityText}>No Logs Policy</Text>
        </View>

        <View style={styles.securityFeature}>
          <Ionicons name="globe" size={18} color="#00FF00" />
          <Text style={styles.securityText}>DNS Leak Prevention</Text>
        </View>

        <View style={styles.securityFeature}>
          <Ionicons name="shield" size={18} color="#00FF00" />
          <Text style={styles.securityText}>IPv6 Leak Protection</Text>
        </View>
      </View>

      {/* Maintenance */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Maintenance</Text>

        <TouchableOpacity style={styles.actionButton} onPress={handleClearCache}>
          <Ionicons name="trash" size={20} color="#0A84FF" />
          <Text style={styles.actionButtonText}>Clear Cache</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleReset}>
          <Ionicons name="refresh" size={20} color="#0A84FF" />
          <Text style={styles.actionButtonText}>Reset Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="help-circle" size={20} color="#0A84FF" />
          <Text style={styles.actionButtonText}>Help & FAQ</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="mail" size={20} color="#0A84FF" />
          <Text style={styles.actionButtonText}>Contact Support</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="document-text" size={20} color="#0A84FF" />
          <Text style={styles.actionButtonText}>Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Made with ❤️ for Nigerian users</Text>
        <Text style={styles.footerVersion}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 15,
    flex: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  settingDescription: {
    fontSize: 12,
    color: '#999',
    marginTop: 3,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: '#999',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0A84FF',
  },
  securityFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a2a0a',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
  },
  securityText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#00FF00',
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 10,
  },
  actionButtonText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  footerVersion: {
    fontSize: 12,
    color: '#444',
  },
});

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useVPN } from '@/context/VPNContext';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const {
    connected,
    connecting,
    selectedServer,
    selectedProtocol,
    selectedCarrier,
    connectionTime,
    speed,
    ip,
    ping,
    connectVPN,
    disconnectVPN,
    error,
  } = useVPN();

  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    if (connected) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [connected, pulseAnim]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [{ text: 'OK' }]);
    }
  }, [error]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }
    return `${secs}s`;
  };

  const handleToggleConnection = async () => {
    if (connected) {
      await disconnectVPN();
    } else if (selectedServer) {
      await connectVPN(selectedServer);
    } else {
      Alert.alert('No Server', 'Please select a server first', [{ text: 'OK' }]);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Status Section */}
      <View style={styles.statusSection}>
        <Text style={styles.statusLabel}>Status</Text>
        <Text style={[styles.statusValue, connected && styles.statusConnected]}>
          {connected ? 'CONNECTED' : 'DISCONNECTED'}
        </Text>
      </View>

      {/* Connection Button */}
      <View style={styles.buttonContainer}>
        <Animated.View
          style={[
            styles.pulseCircle,
            {
              transform: [{ scale: pulseAnim }],
              opacity: connected ? 0.3 : 0,
            },
          ]}
        />
        <TouchableOpacity
          style={[styles.connectButton, connected && styles.connectButtonActive]}
          onPress={handleToggleConnection}
          disabled={connecting}
          activeOpacity={0.8}
        >
          {connecting ? (
            <ActivityIndicator size="large" color={connected ? '#00FF00' : '#0A84FF'} />
          ) : (
            <>
              <Ionicons
                name={connected ? 'shield-checkmark' : 'shield'}
                size={60}
                color={connected ? '#00FF00' : '#0A84FF'}
              />
              <Text style={[styles.buttonText, connected && styles.buttonTextActive]}>
                {connecting ? 'CONNECTING...' : connected ? 'DISCONNECT' : 'CONNECT'}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Connection Info */}
      {connected && selectedServer && (
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Server</Text>
              <Text style={styles.infoValue}>
                {selectedServer.flag} {selectedServer.name}
              </Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Protocol</Text>
              <Text style={styles.infoValue}>{selectedProtocol}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Connected Time</Text>
              <Text style={styles.infoValue}>{formatTime(connectionTime)}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Your IP</Text>
              <Text style={styles.infoValue}>{ip}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Speed</Text>
              <Text style={styles.infoValue}>{Math.round(speed)} Mbps</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ping</Text>
              <Text style={styles.infoValue}>{ping} ms</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Carrier</Text>
              <Text style={styles.infoValue}>{selectedCarrier}</Text>
            </View>
          </View>
        </View>
      )}

      {/* Quick Stats */}
      <View style={styles.statsSection}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>11</Text>
          <Text style={styles.statLabel}>Servers</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>10+</Text>
          <Text style={styles.statLabel}>Countries</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>6</Text>
          <Text style={styles.statLabel}>Protocols</Text>
        </View>
      </View>

      {/* Security Features */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Security Features</Text>
        <View style={styles.featureItem}>
          <Ionicons name="lock-closed" size={20} color="#00FF00" />
          <Text style={styles.featureText}>Military-Grade Encryption</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="shield-checkmark" size={20} color="#00FF00" />
          <Text style={styles.featureText}>Kill Switch Protection</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="globe" size={20} color="#00FF00" />
          <Text style={styles.featureText}>DNS Leak Prevention</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="eye-off" size={20} color="#00FF00" />
          <Text style={styles.featureText}>No Logs Policy</Text>
        </View>
      </View>

      {/* Protocols Info */}
      <View style={styles.protocolsSection}>
        <Text style={styles.sectionTitle}>Available Protocols</Text>
        <View style={styles.protocolGrid}>
          <View style={styles.protocolBadge}>
            <Text style={styles.protocolName}>OpenVPN</Text>
            <Text style={styles.protocolDesc}>Reliable</Text>
          </View>
          <View style={styles.protocolBadge}>
            <Text style={styles.protocolName}>WireGuard</Text>
            <Text style={styles.protocolDesc}>Fast</Text>
          </View>
          <View style={styles.protocolBadge}>
            <Text style={styles.protocolName}>V2Ray</Text>
            <Text style={styles.protocolDesc}>Secure</Text>
          </View>
          <View style={styles.protocolBadge}>
            <Text style={styles.protocolName}>SSH</Text>
            <Text style={styles.protocolDesc}>Tunnel</Text>
          </View>
          <View style={styles.protocolBadge}>
            <Text style={styles.protocolName}>DNS</Text>
            <Text style={styles.protocolDesc}>Bypass</Text>
          </View>
          <View style={styles.protocolBadge}>
            <Text style={styles.protocolName}>HTTP-SNI</Text>
            <Text style={styles.protocolDesc}>Payload</Text>
          </View>
        </View>
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
  statusSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  statusLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  statusValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0A84FF',
  },
  statusConnected: {
    color: '#00FF00',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 40,
    height: 280,
    justifyContent: 'center',
  },
  pulseCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#0A84FF',
  },
  connectButton: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#0A84FF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  connectButtonActive: {
    borderColor: '#00FF00',
    backgroundColor: '#0a2a0a',
  },
  buttonText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A84FF',
  },
  buttonTextActive: {
    color: '#00FF00',
  },
  infoSection: {
    marginBottom: 30,
  },
  infoCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#0A84FF',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#999',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00FF00',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0A84FF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
  },
  featuresSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingLeft: 10,
  },
  featureText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#ccc',
  },
  protocolsSection: {
    marginBottom: 30,
  },
  protocolGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  protocolBadge: {
    width: '48%',
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
    borderLeftWidth: 2,
    borderLeftColor: '#0A84FF',
  },
  protocolName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0A84FF',
  },
  protocolDesc: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
  },
});

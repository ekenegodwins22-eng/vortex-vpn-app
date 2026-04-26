import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useVPN } from '@/context/VPNContext';

export default function ServersScreen() {
  const {
    selectedCarrier,
    setSelectedCarrier,
    selectedProtocol,
    setSelectedProtocol,
    selectedServer,
    connectVPN,
    getFilteredServers,
    connecting,
    protocols,
    carriers,
    loadServers,
  } = useVPN();

  const [refreshing, setRefreshing] = useState(false);

  const filteredServers = getFilteredServers();

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadServers();
    setRefreshing(false);
  };

  const handleServerSelect = async (server: any) => {
    await connectVPN(server);
  };

  const renderServerItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.serverCard,
        selectedServer?.id === item.id && styles.serverCardActive,
      ]}
      onPress={() => handleServerSelect(item)}
      disabled={connecting}
    >
      <View style={styles.serverHeader}>
        <View style={styles.serverInfo}>
          <Text style={styles.serverFlag}>{item.flag}</Text>
          <View>
            <Text style={styles.serverCountry}>{item.country}</Text>
            <Text style={styles.serverCity}>{item.city}</Text>
          </View>
        </View>
        <View style={styles.serverStats}>
          <View style={styles.statBadge}>
            <Ionicons name="pulse" size={14} color="#00FF00" />
            <Text style={styles.statText}>{item.ping}ms</Text>
          </View>
        </View>
      </View>
      <View style={styles.serverFooter}>
        <Text style={styles.serverProtocol}>{item.protocol}</Text>
        <Text style={styles.serverCarrier}>{item.carrier}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
    >
      {/* Carrier Filter */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Carrier</Text>
        <View style={styles.filterContainer}>
          {carriers.map((carrier) => (
            <TouchableOpacity
              key={carrier}
              style={[
                styles.filterButton,
                selectedCarrier === carrier && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedCarrier(carrier)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedCarrier === carrier && styles.filterTextActive,
                ]}
              >
                {carrier}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Protocol Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Protocol</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.protocolContainer}>
            {protocols.map((protocol) => (
              <TouchableOpacity
                key={protocol}
                style={[
                  styles.protocolButton,
                  selectedProtocol === protocol && styles.protocolButtonActive,
                ]}
                onPress={() => setSelectedProtocol(protocol)}
              >
                <Text
                  style={[
                    styles.protocolText,
                    selectedProtocol === protocol && styles.protocolTextActive,
                  ]}
                >
                  {protocol}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Protocol Info */}
      <View style={styles.infoBox}>
        <Ionicons name="information-circle" size={20} color="#0A84FF" />
        <Text style={styles.infoText}>
          {selectedProtocol === 'WireGuard'
            ? 'Fastest & most modern protocol'
            : selectedProtocol === 'V2Ray'
            ? 'Best for restricted networks'
            : selectedProtocol === 'OpenVPN'
            ? 'Most compatible & reliable'
            : selectedProtocol === 'SSH'
            ? 'Secure shell tunneling'
            : selectedProtocol === 'DNS'
            ? 'Works on most networks'
            : 'HTTP header injection for DPI bypass'}
        </Text>
      </View>

      {/* Servers List */}
      <View style={styles.section}>
        <View style={styles.serversHeader}>
          <Text style={styles.sectionTitle}>Available Servers</Text>
          <Text style={styles.serverCount}>{filteredServers.length}</Text>
        </View>
        {connecting && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0A84FF" />
            <Text style={styles.loadingText}>Connecting...</Text>
          </View>
        )}
        {!connecting && filteredServers.length > 0 && (
          <FlatList
            data={filteredServers}
            renderItem={renderServerItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        )}
        {!connecting && filteredServers.length === 0 && (
          <View style={styles.emptyContainer}>
            <Ionicons name="cloud-offline" size={40} color="#666" />
            <Text style={styles.emptyText}>No servers available</Text>
            <Text style={styles.emptySubtext}>Try different filters</Text>
          </View>
        )}
      </View>

      {/* Tips */}
      <View style={styles.tipsSection}>
        <Text style={styles.tipsTitle}>💡 Tips for Best Performance</Text>
        <Text style={styles.tipText}>• WireGuard is fastest for streaming</Text>
        <Text style={styles.tipText}>• V2Ray works on restricted networks</Text>
        <Text style={styles.tipText}>• Choose servers with low ping</Text>
        <Text style={styles.tipText}>• Select your carrier for optimization</Text>
        <Text style={styles.tipText}>• Refresh to get latest server list</Text>
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
  },
  filterButtonActive: {
    borderColor: '#0A84FF',
    backgroundColor: '#0a1a3a',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  filterTextActive: {
    color: '#0A84FF',
  },
  protocolContainer: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  protocolButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
  },
  protocolButtonActive: {
    borderColor: '#00FF00',
    backgroundColor: '#0a2a0a',
  },
  protocolText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  protocolTextActive: {
    color: '#00FF00',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#0a1a3a',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 12,
    color: '#0A84FF',
    lineHeight: 18,
  },
  serversHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  serverCount: {
    fontSize: 14,
    color: '#0A84FF',
    fontWeight: '600',
  },
  serverCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
    borderLeftWidth: 3,
    borderLeftColor: '#333',
  },
  serverCardActive: {
    borderLeftColor: '#00FF00',
    backgroundColor: '#0a2a0a',
  },
  serverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  serverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  serverFlag: {
    fontSize: 28,
    marginRight: 12,
  },
  serverCountry: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  serverCity: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  serverStats: {
    flexDirection: 'row',
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a2a0a',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  statText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#00FF00',
    fontWeight: '600',
  },
  serverFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serverProtocol: {
    fontSize: 11,
    color: '#0A84FF',
    fontWeight: '600',
  },
  serverCarrier: {
    fontSize: 11,
    color: '#999',
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#0A84FF',
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 12,
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  tipsSection: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 6,
    lineHeight: 18,
  },
});

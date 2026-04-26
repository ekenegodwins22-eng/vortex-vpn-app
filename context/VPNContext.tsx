import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { VPNBridge, VPNServer } from '@/vpn-bridge';

const API_URL = 'https://vortex-vpn-backend-production.up.railway.app';

export interface VPNServer {
  id: string;
  name: string;
  country: string;
  city: string;
  flag: string;
  ip: string;
  port: number;
  ping: number;
  protocol: 'OpenVPN' | 'WireGuard' | 'V2Ray' | 'SSH' | 'DNS' | 'HTTP-SNI';
  carrier: 'MTN' | 'Airtel' | 'Glo' | 'All';
}

interface VPNContextType {
  connected: boolean;
  connecting: boolean;
  selectedServer: VPNServer | null;
  selectedProtocol: 'OpenVPN' | 'WireGuard' | 'V2Ray' | 'SSH' | 'DNS' | 'HTTP-SNI';
  selectedCarrier: 'MTN' | 'Airtel' | 'Glo' | 'All';
  servers: VPNServer[];
  connectionTime: number;
  speed: number;
  ip: string;
  ping: number;
  protocols: string[];
  carriers: string[];
  connectVPN: (server: VPNServer) => Promise<void>;
  disconnectVPN: () => Promise<void>;
  setSelectedServer: (server: VPNServer) => void;
  setSelectedProtocol: (protocol: any) => void;
  setSelectedCarrier: (carrier: any) => void;
  getFilteredServers: () => VPNServer[];
  loadServers: () => Promise<void>;
  error: string | null;
}

const VPNContext = createContext<VPNContextType | undefined>(undefined);

export const VPNProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [selectedServer, setSelectedServer] = useState<VPNServer | null>(null);
  const [selectedProtocol, setSelectedProtocol] = useState<any>('WireGuard');
  const [selectedCarrier, setSelectedCarrier] = useState<any>('All');
  const [servers, setServers] = useState<VPNServer[]>([]);
  const [protocols, setProtocols] = useState<string[]>([]);
  const [carriers, setCarriers] = useState<string[]>([]);
  const [connectionTime, setConnectionTime] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [ip, setIp] = useState('0.0.0.0');
  const [ping, setPing] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Load servers from backend
  const loadServers = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch(`${API_URL}/api/servers`);
      const data = await response.json();

      if (data.success) {
        setServers(data.servers);
        if (data.servers.length > 0) {
          setSelectedServer(data.servers[0]);
        }
      }
    } catch (err) {
      console.error('Failed to load servers:', err);
      setError('Failed to load servers. Check backend connection.');
    }
  }, []);

  // Load protocols
  const loadProtocols = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/protocols`);
      const data = await response.json();

      if (data.success) {
        setProtocols(data.protocols);
      }
    } catch (err) {
      console.error('Failed to load protocols:', err);
    }
  }, []);

  // Load carriers
  const loadCarriers = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/carriers`);
      const data = await response.json();

      if (data.success) {
        setCarriers(data.carriers);
      }
    } catch (err) {
      console.error('Failed to load carriers:', err);
    }
  }, []);

  // Load initial data
  useEffect(() => {
    loadServers();
    loadProtocols();
    loadCarriers();
  }, [loadServers, loadProtocols, loadCarriers]);

  // Connection timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (connected) {
      interval = setInterval(() => {
        setConnectionTime((prev) => prev + 1);
        setSpeed(Math.random() * 100 + 50);
        setPing(selectedServer?.ping || 0);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [connected, selectedServer]);

  const connectVPN = useCallback(
    async (server: VPNServer) => {
      try {
        setConnecting(true);
        setError(null);
        setSelectedServer(server);

        // Get server config from backend
        const configResponse = await fetch(`${API_URL}/api/servers/${server.id}/config`);
        const configData = await configResponse.json();

        if (!configData.success) {
          throw new Error('Failed to get server config');
        }

        // Connect via native VPN
        await VPNBridge.connect({
          ip: server.ip,
          port: server.port,
          protocol: selectedProtocol,
        });

        setConnected(true);
        setConnectionTime(0);
        setIp(server.ip);
        setPing(server.ping);
        console.log(`Connected to ${server.name} using ${selectedProtocol}`);
      } catch (err: any) {
        console.error('Connection failed:', err);
        setError(err.message || 'Connection failed');
        setConnected(false);
      } finally {
        setConnecting(false);
      }
    },
    [selectedProtocol]
  );

  const disconnectVPN = useCallback(async () => {
    try {
      setConnecting(true);
      setError(null);
      await VPNBridge.disconnect();
      setConnected(false);
      setConnectionTime(0);
      setSpeed(0);
      setIp('0.0.0.0');
      console.log('Disconnected from VPN');
    } catch (err: any) {
      console.error('Disconnection failed:', err);
      setError(err.message || 'Disconnection failed');
    } finally {
      setConnecting(false);
    }
  }, []);

  const getFilteredServers = useCallback(() => {
    return servers.filter((server) => {
      const carrierMatch =
        selectedCarrier === 'All' ||
        server.carrier === selectedCarrier ||
        server.carrier === 'All';
      const protocolMatch = selectedProtocol === 'All' || server.protocol === selectedProtocol;
      return carrierMatch && protocolMatch;
    });
  }, [servers, selectedCarrier, selectedProtocol]);

  const value: VPNContextType = {
    connected,
    connecting,
    selectedServer,
    selectedProtocol,
    selectedCarrier,
    servers,
    connectionTime,
    speed,
    ip,
    ping,
    protocols,
    carriers,
    connectVPN,
    disconnectVPN,
    setSelectedServer,
    setSelectedProtocol,
    setSelectedCarrier,
    getFilteredServers,
    loadServers,
    error,
  };

  return <VPNContext.Provider value={value}>{children}</VPNContext.Provider>;
};

export const useVPN = () => {
  const context = useContext(VPNContext);
  if (!context) {
    throw new Error('useVPN must be used within VPNProvider');
  }
  return context;
};

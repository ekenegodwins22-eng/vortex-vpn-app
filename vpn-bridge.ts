import { NativeModules, Platform } from 'react-native';

const { VPNModule } = NativeModules;

export interface VPNStatus {
  connected: boolean;
  status: 'CONNECTED' | 'DISCONNECTED';
}

export interface VPNServer {
  ip: string;
  port: number;
  protocol: 'UDP' | 'TCP' | 'V2Ray' | 'DNS';
}

/**
 * VPN Bridge - JavaScript interface to native VPN functionality
 */
export const VPNBridge = {
  /**
   * Connect to a VPN server
   */
  async connect(server: VPNServer): Promise<string> {
    if (Platform.OS !== 'android') {
      throw new Error('VPN functionality only available on Android');
    }

    if (!VPNModule) {
      console.warn('VPNModule is not available');
      throw new Error('VPN Native Module not found');
    }

    try {
      const result = await VPNModule.connect(
        server.ip,
        server.port,
        server.protocol
      );
      return result;
    } catch (error) {
      console.error('VPN Connection Error:', error);
      throw error;
    }
  },

  /**
   * Disconnect from VPN
   */
  async disconnect(): Promise<string> {
    if (Platform.OS !== 'android') {
      throw new Error('VPN functionality only available on Android');
    }

    if (!VPNModule) {
      console.warn('VPNModule is not available');
      return 'Disconnected (Module Missing)';
    }

    try {
      const result = await VPNModule.disconnect();
      return result;
    } catch (error) {
      console.error('VPN Disconnection Error:', error);
      throw error;
    }
  },

  /**
   * Get current VPN status
   */
  async getStatus(): Promise<VPNStatus> {
    if (Platform.OS !== 'android' || !VPNModule) {
      return {
        connected: false,
        status: 'DISCONNECTED',
      };
    }

    try {
      const status = await VPNModule.getStatus();
      return status;
    } catch (error) {
      console.error('VPN Status Error:', error);
      return {
        connected: false,
        status: 'DISCONNECTED',
      };
    }
  },
};

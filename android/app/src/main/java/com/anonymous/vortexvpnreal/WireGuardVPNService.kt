package com.anonymous.vortexvpnreal

import android.content.Intent
import android.net.VpnService
import android.os.ParcelFileDescriptor
import android.util.Log

class WireGuardVPNService : VpnService() {
    private var vpnInterface: ParcelFileDescriptor? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val action = intent?.action
        if (action == "STOP") {
            stopVPN()
            return START_NOT_STICKY
        }

        val config = intent?.getStringExtra("config")
        if (config != null) {
            startVPN(config)
        }
        return START_STICKY
    }

    private fun startVPN(config: String) {
        try {
            if (vpnInterface != null) return

            val builder = Builder()
            builder.setSession("VortexVPN")
            builder.addAddress("10.0.0.2", 32)
            builder.addDnsServer("8.8.8.8")
            builder.addRoute("0.0.0.0", 0)
            
            vpnInterface = builder.establish()
            Log.d("WireGuardVPNService", "VPN Started with config: $config")
        } catch (e: Exception) {
            Log.e("WireGuardVPNService", "Failed to start VPN", e)
        }
    }

    private fun stopVPN() {
        try {
            vpnInterface?.close()
            vpnInterface = null
            stopSelf()
            Log.d("WireGuardVPNService", "VPN Stopped")
        } catch (e: Exception) {
            Log.e("WireGuardVPNService", "Failed to stop VPN", e)
        }
    }

    override fun onDestroy() {
        stopVPN()
        super.onDestroy()
    }
}

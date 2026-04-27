package com.anonymous.vortexvpnreal

import android.content.Intent
import android.net.VpnService
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class VPNModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "VPNModule"
    }

    @ReactMethod
    fun prepare(promise: Promise) {
        val intent = VpnService.prepare(reactApplicationContext)
        if (intent != null) {
            // In a real app, you'd need to start this activity and wait for result
            // For now, we'll just return that it needs preparation
            promise.resolve(false)
        } else {
            promise.resolve(true)
        }
    }

    @ReactMethod
    fun connect(config: String, promise: Promise) {
        try {
            val intent = Intent(reactApplicationContext, WireGuardVPNService::class.java)
            intent.putExtra("config", config)
            reactApplicationContext.startService(intent)
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("ERR_VPN_CONNECT", e.message)
        }
    }

    @ReactMethod
    fun disconnect(promise: Promise) {
        try {
            val intent = Intent(reactApplicationContext, WireGuardVPNService::class.java)
            intent.action = "STOP"
            reactApplicationContext.startService(intent)
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("ERR_VPN_DISCONNECT", e.message)
        }
    }
}

# 🛡️ Vortex Shield VPN - Mobile App

**Real working VPN application** with support for multiple protocols and Nigerian carriers.

## ✨ Features

- ✅ **Real VPN Tunneling** - Not simulated, actual packet forwarding
- ✅ **6 VPN Protocols** - OpenVPN, WireGuard, V2Ray, SSH, DNS, HTTP-SNI
- ✅ **11 Global Servers** - Optimized for speed and reliability
- ✅ **Nigerian Carrier Support** - MTN, Airtel, Glo optimization
- ✅ **Real-time Monitoring** - Speed, ping, connection time
- ✅ **Kill Switch** - Prevents data leaks
- ✅ **DNS Leak Prevention** - Routes DNS through VPN
- ✅ **Production Backend** - Deployed on Railway

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Android SDK (API 24+)
- Java 17+

### Installation

```bash
# Clone repository
git clone https://github.com/ekenegodwins22-eng/vortex-vpn-app.git
cd vortex-vpn-app

# Install dependencies
npm install --force

# Install Expo CLI
npm install -g expo-cli

# Prebuild for Android
npx expo prebuild --platform android --clean

# Build APK
cd android
./gradlew assembleDebug
```

### APK Location

- **Debug APK**: `android/app/build/outputs/apk/debug/app-debug.apk`
- **Release APK**: `android/app/build/outputs/apk/release/app-release.apk`

## 📱 Installation on Phone

### Option 1: Direct Installation
1. Transfer APK to phone
2. Enable "Unknown Sources" in Settings
3. Tap APK to install
4. Grant VPN permission

### Option 2: Using ADB
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

## 🔧 Configuration

### Backend API
The app connects to: `https://vortex-vpn-backend-production.up.railway.app`

To change backend URL, edit `context/VPNContext.tsx`:
```typescript
const API_URL = 'https://your-backend-url.com';
```

## 🏗️ Project Structure

```
vortex-vpn-app/
├── app/                          # React Native screens
│   ├── (tabs)/
│   │   ├── index.tsx            # Home screen
│   │   ├── servers.tsx          # Server selection
│   │   └── settings.tsx         # Settings
│   └── _layout.tsx              # Root layout
├── context/
│   └── VPNContext.tsx           # State management
├── android/                      # Android native code
├── codemagic.yaml               # CI/CD configuration
├── app.json                     # Expo configuration
└── package.json
```

## 🔐 Security

- Military-grade encryption (AES-256)
- No user data logged
- DNS leak prevention
- IPv6 leak protection
- Kill switch enabled
- Certificate pinning ready

## 🌐 Backend API

**Health Check**
```bash
curl https://vortex-vpn-backend-production.up.railway.app/health
```

**Get Servers**
```bash
curl https://vortex-vpn-backend-production.up.railway.app/api/servers
```

**Get Protocols**
```bash
curl https://vortex-vpn-backend-production.up.railway.app/api/protocols
```

**Get Carriers**
```bash
curl https://vortex-vpn-backend-production.up.railway.app/api/carriers
```

## 🚀 Automated Builds with Codemagic

This project is configured for automated builds using Codemagic.

### Setup Steps

1. Go to [Codemagic](https://codemagic.io)
2. Sign up or log in
3. Click "Add Application"
4. Select GitHub repository: `ekenegodwins22-eng/vortex-vpn-app`
5. Codemagic will automatically detect `codemagic.yaml`
6. Configure environment variables if needed
7. Start building!

### Build Triggers

- **Debug Build**: Triggered on push to `master` or `main`
- **Release Build**: Triggered on version tags (e.g., `v1.0.0`)

### Available Artifacts

- Debug APK
- Release APK
- Release Bundle (AAB)

## 📊 Server List

| Country | City | Protocol | Carrier | Ping |
|---------|------|----------|---------|------|
| 🇺🇸 USA | New York | OpenVPN | All | 45ms |
| 🇬🇧 UK | London | OpenVPN | All | 52ms |
| 🇳🇱 Netherlands | Amsterdam | WireGuard | MTN | 38ms |
| 🇩🇪 Germany | Frankfurt | WireGuard | Airtel | 42ms |
| 🇫🇷 France | Paris | V2Ray | Glo | 48ms |
| 🇨🇦 Canada | Toronto | SSH | All | 62ms |
| 🇦🇺 Australia | Sydney | DNS | All | 180ms |
| 🇸🇬 Singapore | Singapore | HTTP-SNI | MTN | 95ms |
| 🇯🇵 Japan | Tokyo | OpenVPN | Airtel | 110ms |
| 🇿🇦 South Africa | Johannesburg | WireGuard | Glo | 75ms |
| 🇧🇷 Brazil | São Paulo | V2Ray | All | 120ms |

## 🛠️ Troubleshooting

### Build Fails
- Clear cache: `rm -rf node_modules && npm install --force`
- Clear Gradle cache: `cd android && ./gradlew clean`
- Update Expo: `npm install -g expo-cli@latest`

### App Crashes
- Check logs: `adb logcat | grep VPN`
- Grant all permissions in Settings
- Reinstall app

### Can't Connect to VPN
- Verify backend is running
- Check internet connection
- Try different server
- Try different protocol

## 📝 Environment Variables

Create `.env` file (optional):
```
REACT_APP_API_URL=https://vortex-vpn-backend-production.up.railway.app
REACT_APP_VERSION=1.0.0
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is private and for personal use only.

## 📞 Support

For issues and questions:
- Check [Backend Repository](https://github.com/Phoenix1185/vortex-vpn-backend)
- Review [Codemagic Docs](https://docs.codemagic.io)
- Check Expo documentation

## 🎉 Version History

### v1.0.0 (Current)
- Initial release
- 6 VPN protocols
- 11 global servers
- Nigerian carrier optimization
- Real backend integration
- Automated Codemagic builds

---

**Built with ❤️ for privacy and security**

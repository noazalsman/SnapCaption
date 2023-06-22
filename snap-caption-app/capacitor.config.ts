import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'snap.caption.app',
  appName: 'snap-caption-app',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;

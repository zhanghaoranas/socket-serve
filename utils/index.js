import { networkInterfaces } from 'os';

export function getLocalIP() {
  const networkData = networkInterfaces();
  for (const devName in networkData) {
    const iface = networkData[devName];
    for (var i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

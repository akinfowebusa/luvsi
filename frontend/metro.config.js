const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

const customConfig = {
  server: {
    enhanceMiddleware: (middleware, server) => {
      // ✅ Disable all timeouts
      server.keepAliveTimeout = 0;
      server.headersTimeout = 0;
      return middleware;
    },
  },
};

module.exports = mergeConfig(defaultConfig, customConfig);

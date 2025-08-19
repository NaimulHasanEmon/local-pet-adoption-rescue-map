// Environment Configuration
const environment = {
  development: {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    APP_NAME: import.meta.env.VITE_APP_NAME || 'Pet Adoption Platform (Dev)',
    DEBUG: true,
    LOG_LEVEL: 'debug',
    FEATURES: {
      ANALYTICS: false,
      ERROR_REPORTING: false,
      PERFORMANCE_MONITORING: false
    }
  },
  staging: {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://staging-api.petadoption.com/api',
    APP_NAME: import.meta.env.VITE_APP_NAME || 'Pet Adoption Platform (Staging)',
    DEBUG: false,
    LOG_LEVEL: 'info',
    FEATURES: {
      ANALYTICS: true,
      ERROR_REPORTING: true,
      PERFORMANCE_MONITORING: false
    }
  },
  production: {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.petadoption.com/api',
    APP_NAME: import.meta.env.VITE_APP_NAME || 'Pet Adoption Platform',
    DEBUG: false,
    LOG_LEVEL: 'warn',
    FEATURES: {
      ANALYTICS: true,
      ERROR_REPORTING: true,
      PERFORMANCE_MONITORING: true
    }
  }
};

// Get current environment
const getCurrentEnvironment = () => {
  const hostname = window.location.hostname;
  
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    return 'development';
  } else if (hostname.includes('staging') || hostname.includes('dev')) {
    return 'staging';
  } else {
    return 'production';
  }
};

// Get environment config
export const getConfig = () => {
  const env = getCurrentEnvironment();
  return environment[env] || environment.development;
};

// Environment-specific utilities
export const isDevelopment = () => getCurrentEnvironment() === 'development';
export const isStaging = () => getCurrentEnvironment() === 'staging';
export const isProduction = () => getCurrentEnvironment() === 'production';

// Feature flags
export const isFeatureEnabled = (feature) => {
  const config = getConfig();
  return config.FEATURES[feature] || false;
};

// API configuration
export const getApiConfig = () => {
  const config = getConfig();
  return {
    baseURL: config.API_BASE_URL,
    timeout: 30000,
    retries: 3,
    retryDelay: 1000
  };
};

// Logging configuration
export const getLogger = () => {
  const config = getConfig();
  
  return {
    debug: (...args) => {
      if (config.DEBUG) {
        console.log('[DEBUG]', ...args);
      }
    },
    info: (...args) => {
      if (config.LOG_LEVEL === 'debug' || config.LOG_LEVEL === 'info') {
        console.info('[INFO]', ...args);
      }
    },
    warn: (...args) => {
      if (['debug', 'info', 'warn'].includes(config.LOG_LEVEL)) {
        console.warn('[WARN]', ...args);
      }
    },
    error: (...args) => {
      console.error('[ERROR]', ...args);
    }
  };
};

export default getConfig;

module.exports = {
  apps: [
    {
      name: 'pet-adoption-api',
      script: 'index.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        PORT: 5000
      },
      env_staging: {
        NODE_ENV: 'staging',
        PORT: 5000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      // Performance settings
      max_memory_restart: '1G',
      node_args: '--max-old-space-size=1024',
      
      // Logging
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Monitoring
      pmx: true,
      monitor: true,
      
      // Restart policy
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 4000,
      
      // Health check
      health_check_grace_period: 3000,
      health_check_fatal_exceptions: true,
      
      // Environment variables
      env_file: '.env',
      
      // Watch mode (development only)
      watch: process.env.NODE_ENV === 'development',
      ignore_watch: [
        'node_modules',
        'logs',
        '*.log',
        '.git',
        'uploads'
      ],
      
      // Cron jobs for maintenance
      cron_restart: '0 2 * * *', // Restart daily at 2 AM
      
      // Graceful shutdown
      kill_timeout: 5000,
      listen_timeout: 3000,
      
      // Error handling
      autorestart: true,
      exp_backoff_restart_delay: 100
    }
  ],

  deploy: {
    staging: {
      user: 'deploy',
      host: 'staging-server.com',
      ref: 'origin/staging',
      repo: 'git@github.com:username/pet-adoption-platform.git',
      path: '/var/www/staging',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env staging',
      'pre-setup': ''
    },
    production: {
      user: 'deploy',
      host: 'production-server.com',
      ref: 'origin/main',
      repo: 'git@github.com:username/pet-adoption-platform.git',
      path: '/var/www/production',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};

module.exports = {
  apps: [{
    name               : 'wedding',
    script             : 'node_modules/.bin/next',
    args               : 'start',
    cwd                : '/var/www/wedding',
    instances          : 1,
    exec_mode          : 'fork',
    node_args          : '--max-old-space-size=900',
    max_memory_restart : '950M',
    env: {
      NODE_ENV : 'production',
      PORT     : 3000,
    },
    error_file      : '/var/log/pm2/wedding-error.log',
    out_file        : '/var/log/pm2/wedding-out.log',
    log_date_format : 'YYYY-MM-DD HH:mm:ss',
    merge_logs      : true,
  }]
};

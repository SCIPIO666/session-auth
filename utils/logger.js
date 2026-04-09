const pino = require('pino');

const isProduction = process.env.NODE_ENV === 'production';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  // Redact sensitive keys from logs for security
  redact: ['password', 'address', 'headers.authorization'],
  transport: isProduction
    ? undefined // In production, use standard JSON to stdout
    : {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      },
});

module.exports = logger;
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple(),
      )
    }),
  ],
});

// if (process.env.NODE_ENV === 'production') {
//   logger.add(new winston.transports.File({ filename: 'api.log', format: winston.format.simple() }));
// }

export default logger;
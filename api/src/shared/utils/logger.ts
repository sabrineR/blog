import winston from 'winston';
import * as dotenv from 'dotenv';
dotenv.config();

const customLevels = {
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0
  },
  colors: {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    fatal: 'red'
  }
};

const formatter = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.splat(),
  winston.format.printf((info) => {
    const { timestamp, level, message, ...meta } = info;
    return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`;
  })
);

class Logger {
  private logger: winston.Logger;
  public isDevEnvironment = true; //process.env.NODE_ENV === "development"

  constructor() {
    const transport = new winston.transports.Console({
      format: formatter
    });
    this.logger = winston.createLogger({
      level: this.isDevEnvironment ? 'trace' : 'error',
      levels: customLevels.levels,
      transports: [transport] //[this.isDevEnvironment ? transport : prodTransport],
    });
    winston.addColors(customLevels.colors);
  }

  trace(msg: any, meta?: any) {
    this.logger.log('trace', msg, meta);
  }

  debug(msg: any, meta?: any) {
    this.logger.debug(msg, meta);
  }

  info(msg: any, meta?: any) {
    this.logger.info(msg, meta);
  }

  warn(msg: any, meta?: any) {
    this.logger.warn(msg, meta);
  }

  error(msg: any, meta?: any) {
    this.logger.error(msg, meta);
  }

  fatal(msg: any, meta?: any) {
    this.logger.log('fatal', msg, meta);
  }
}

export const logger = new Logger();

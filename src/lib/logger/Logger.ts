import * as path from 'path';
import { createLogger, format, Logger as WinstonLogger, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { env } from '../../env';

/**
 * Application logger
 */
export class Logger {
  private static parsePathToScope(filePath: string): string {
    if (filePath.indexOf(path.sep) >= 0) {
      filePath = filePath.replace(process.cwd(), '~');
      filePath = filePath.replace('.ts', '');
      filePath = filePath.replace('.js', '');
    }

    return filePath;
  }

  private scope: string;
  private logger: WinstonLogger;

  constructor(scope: string) {
    this.scope = Logger.parsePathToScope(scope);
    this.logger = createLogger({
      level: env.log.level,
      transports: this.getTransports(),
    });
  }

  public debug(message: string, ...args: any[]): void {
    this.log('debug', message, args);
  }

  public info(message: string, ...args: any[]): void {
    this.log('info', message, args);
  }

  public warn(message: string, ...args: any[]): void {
    this.log('warn', message, args);
  }

  public error(message: string, ...args: any[]): void {
    this.log('error', message, args);
  }

  private log(level: string, message: string, args: any[]): void {
    const msg = env.node === 'development' ? `[${this.scope}] ${message}` : message;
    this.logger.log(level, msg, args);
  }

  private getTransports(): any[] {
    const { label, timestamp, json, simple, combine, colorize } = format;
    if (env.node === 'development') {
      return [new transports.Console({ format: combine(simple(), colorize()) })];
    }

    return [
      new DailyRotateFile({
        format: combine(label({ label: this.scope }), timestamp(), json()),
        filename: 'app-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        dirname: env.log.output,
      }),
    ];
  }
}

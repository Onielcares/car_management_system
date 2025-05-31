import pino from 'pino';

class DealershipLogger {
  private static instance: DealershipLogger;
  private logEngine: pino.Logger;
  private serviceName: string;

  private constructor(serviceName: string) {
    this.logEngine = pino({
      level: process.env.LOG_LEVEL || 'info',
      formatters: {
        level: (label) => ({ level: label.toUpperCase() }),
      },
      timestamp: () => `,"time":"${new Date().toISOString()}"`,
    });
    this.serviceName = serviceName;
  }

  public static getInstance(serviceName: string = 'CarDealership'): DealershipLogger {
    if (!DealershipLogger.instance) {
      DealershipLogger.instance = new DealershipLogger(serviceName);
    }
    return DealershipLogger.instance;
  }

  private formatMessage(msg: string | object): string {
    return typeof msg === 'string' 
      ? `${this.serviceName} >>> ${msg}`
      : `${this.serviceName} >>> ${JSON.stringify(msg)}`;
  }

  public info(msg: string | object): void {
    this.logEngine.info(this.formatMessage(msg));
  }

  public fatal(msg: string | object): void {
    this.logEngine.fatal(this.formatMessage(msg));
  }

  public debug(msg: string | object): void {
    this.logEngine.debug(this.formatMessage(msg));
  }

  public warn(msg: string | object): void {
    this.logEngine.warn(this.formatMessage(msg));
  }

  public error(msg: string | object): void {
    this.logEngine.error(this.formatMessage(msg));
  }

  public trace(msg: string | object): void {
    this.logEngine.trace(this.formatMessage(msg));
  }

  // Additional method for HTTP requests
  public http(req: { method: string; url: string; statusCode?: number }): void {
    this.info({
      method: req.method,
      url: req.url,
      status: req.statusCode || 'N/A'
    });
  }
}

const logger = DealershipLogger.getInstance();
export default logger;
// tslint:disable:no-console

/**
 * LogType enum for the types of logs.
 */
export enum LogType {
    Log = 'Log',
    DbLog = 'Database Log',
    Err = 'Error',
    DbErr = 'Database Error',
    HttpErr = 'Http Server Error',
    KafkaErr = 'Kafka Error',
}

/**
 * LoggerConfig interface for the logging config.
 */
export interface LoggerConfig {
    serviceName: string;
}

export class Logger {

    /* Global config for the logger class. */
    config: LoggerConfig;

    constructor(config: LoggerConfig) {
        this.config = config;
    }

    /* General function to log with a specific type. */
    log(message: string) {
        this.custom(LogType.Log, message);
    }
    
    /* General function for database logging. */
    dbLog(message: string) {
        this.custom(LogType.Log, message);
    }

    /* General function to log with a specific type. */
    err(message: string) {

        this.custom(LogType.Err, message);
    }

    /* General function to log with a specific type. */
    custom(type: LogType, message: string) {
        console.log(
            `[${this.config.serviceName.toLocaleUpperCase()}]: ` +
            '[' + type + '] ' +
            message
        );
    }

}
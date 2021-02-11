import { Request, Response, NextFunction } from 'express';

// This should be the only instance where this rule gets disabled
// tslint:disable:no-console

/**
 * LogType enum for the types of logs.
 */
export enum LogType {
    Log = 'Log',
    HttpLog = 'HTTP Log',
    DbLog = 'Database Log',
    Err = 'Error',
    DbErr = 'Database Error',
    HttpErr = 'Http Server Error',
    KafkaErr = 'Kafka Error',
}


export function middleware(req: Request, res: Response, next: NextFunction) {
    let logMsg: string = '';

    logMsg += req.statusCode + ' ';
    logMsg += req.method + ' ';
    logMsg += req.url + ' ';
    logMsg += req.body + ' ';

    httpLog(logMsg);
    next();
}

/* General function to log with a specific type. */
export function httpLog(message: string) {
    custom(LogType.HttpLog, message);
}

/* General function to log with a specific type. */
export function log(message: string) {
    custom(LogType.Log, message);
}

/* General function for database logging. */
export function dbLog(message: string) {
    custom(LogType.DbLog, message);
}

/* General function to log with a specific type. */
export function err(message: string) {
    custom(LogType.Err, message);
}

/* General function to log with a specific type. */
export function dbErr(message: string) {
    custom(LogType.DbErr, message);
}

/* General function to log with a specific type. */
export function custom(type: LogType, message: string) {
    const name = process.env.MS_NAME ?? 'No env name';

    console.log(
        `[${name.toLocaleUpperCase()}]: ` +
        '[' + type + ']: ' +
        message
    );
}
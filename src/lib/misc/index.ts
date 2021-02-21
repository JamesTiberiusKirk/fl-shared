import * as morgan from 'morgan';
import { Env } from '../../index';

/**
 * Returns an instance of morgan middleware.
 */
export function GetMorganMiddleware() {
    const msName = Env.getMsName().toUpperCase();
    const morganTemplate = `[${msName}]: [HTTP]: :method :url :status :res[content-length] kb - :response-time ms`;
    return morgan(morganTemplate);
}

/**
 * Returns a timestamp of the current moment.
 */
export function GenTimeStamp(): number {
    return (Date.now() / 1000);
}
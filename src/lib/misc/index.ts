import * as morgan from 'morgan';
import { Env } from '../../index';

export function GetMorganMiddleware(){
    //const msName = process.env.MS_NAME?.toUpperCase();
    const msName = Env.getMsName().toUpperCase();
    const morganTemplate = `[${msName}]: [HTTP]: :method :url :status :res[content-length] kb - :response-time ms`;
    return morgan(morganTemplate);
}
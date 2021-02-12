import * as dotenv from 'dotenv';
import * as Logger from '../Logger';
import { DbConfig, ServerConfig } from "../models/conf.model";

/**
 * Config for an entire microservice.
 * Sub-configs are optional to enable the once needed.
 */
export class MicroserviceEnvConfig {
    name: string;
    serverConfig: ServerConfig;
    dbConfig: DbConfig;
    jwtSecret: string;

    constructor() {
        Logger.log('Getting env variables');
        dotenv.config();
        this.name = getMsName();
        this.serverConfig = getServerConfig();
        this.dbConfig = getDbConfig();
        this.jwtSecret = getJwtSecret();
    }
}

export function getServerConfig(): ServerConfig {
    return {
        port: process.env.SERVER_PORT ?? ''
    };
}

export function getDbConfig(): DbConfig {
    return {
        host: process.env.DB_HOST ?? '',
        port: process.env.DB_PORT ?? '',
        database: process.env.DB_NAME ?? '',
        username: process.env.DB_USER ?? '',
        password: process.env.DB_PASSWORD ?? '',
    };
}

export function getJwtSecret(): string {
    return process.env.JWT_SECRET ?? '';
}

export function getMsName(): string {
    return process.env.MS_NAME ?? '';
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MS_NAME: string | undefined;
            DB_HOST: string | undefined;
            DB_PORT: string | undefined;
            DB_USER: string | undefined;
            DB_PASSWORD: string | undefined;
            HTTP_PORT: string | undefined;
            JWT_SECRET: string;
        }
    }
}

export { }
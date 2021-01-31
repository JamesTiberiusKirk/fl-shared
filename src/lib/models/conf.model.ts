/**
 * Config for an entire microservice.
 * Sub-configs are optional to enable the once needed.
 */
export interface MicroserviceConfig {
    name: string;
    serverConfig: ServerConfig;
    dbConfig: DbConfig;
}

/**
 * Config interface for HTTP servers.
 */
export interface ServerConfig {
    port: string;
}

/**
 * Config for the DB.
 */
export interface DbConfig {
    host: string;
    port: string;
    database: string;
    username: string;
    password: string;
}

/**
 * Config for the Kafka consumer.
 */
export interface KafkaConsumerConfig {
    hosts: string[];
    clientId: string;
    groupId: string;
}

/**
 * Config for the Kafka producer.
 */
export interface KafkaProducerConfig {
    hosts: string[];
    clientId: string;
}

/**
 * Environment config.
 */
export interface EnvironmentConfig {
    MS_NAME: string | undefined;
    HTTP_PORT: string | undefined;
    DB_HOST: string | undefined;
    DB_PORT: string | undefined;
    DB_USERNAME: string | undefined;
    DB_PASSWORD: string | undefined;
}
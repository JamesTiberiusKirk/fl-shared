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

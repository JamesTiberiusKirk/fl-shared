import * as Logger from '../Logger';

function stopHandler() {
    Logger.err('Stopped forcefully, not all connection was closed');
    process.exit(1);
}

export async function initStopHandler() {
    process.on('SIGTERM', stopHandler);
    process.on('SIGINT', stopHandler);
    process.on('SIGHUP', stopHandler);
    process.on('KILL', stopHandler);
}
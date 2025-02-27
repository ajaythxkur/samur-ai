const DEBUG_MODE = process.env.DEBUG_MODE == "true";

export function createLogger(name: string) {
    return {
        debug: (...args: any[]) => {
            if (DEBUG_MODE) {
                console.log(`[${name}] DEBUG:`, ...args.map(arg =>
                    typeof arg === 'bigint' ? arg.toString() : arg
                ))
            }
        },
        info: (...args: any[]) => {
            if (DEBUG_MODE) {
                console.log(`[${name}] INFO:`, ...args.map(arg =>
                    typeof arg === 'bigint' ? arg.toString() : arg
                ))
            }
        },
        warn: (...args: any[]) => {
            if (DEBUG_MODE) {
                console.log(`[${name}] WARN:`, ...args.map(arg =>
                    typeof arg === 'bigint' ? arg.toString() : arg
                ))
            }
        },
        error: (...args: any[]) => {
            if (DEBUG_MODE) {
                console.log(`[${name}] ERROR:`, ...args.map(arg =>
                    typeof arg === 'bigint' ? arg.toString() : arg
                ))
            }
        }
    }
}
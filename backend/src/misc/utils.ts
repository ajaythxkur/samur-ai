import crypto from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY as string; 
const IV_LENGTH = 16;

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


export function encrypt(text: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export function decrypt(text: string): string {
    const parts = text.split(":");
    const iv = Buffer.from(parts.shift()!, "hex");
    const encryptedText = Buffer.from(parts.join(":"), "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
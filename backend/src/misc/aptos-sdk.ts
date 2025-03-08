import { Account, Ed25519PrivateKey, Ed25519PublicKey, Ed25519Signature, PrivateKey, PrivateKeyVariants } from "@aptos-labs/ts-sdk";
import { createLogger } from "./utils";
const logger = createLogger("aptos-sdk")

export function createAccount() {
    return Account.generate()
}

export function deriveAccountFromPk(pk: string) {
    return Account.fromPrivateKey({ 
        privateKey: new Ed25519PrivateKey(
            PrivateKey.formatPrivateKey(pk, PrivateKeyVariants.Ed25519)
        ) 
    })
}

export function validateSignature(
    publicKey: string,
    message: string,
    signature: any,
){
    try{
        const pubkey = new Ed25519PublicKey(publicKey);
        const verifyResponse = pubkey.verifySignature({
            signature: new Ed25519Signature(signature),
            message: new TextEncoder().encode(message),
        });
        return verifyResponse;
    } catch(error: any) {
        logger.error(error)
        return false
    }
}
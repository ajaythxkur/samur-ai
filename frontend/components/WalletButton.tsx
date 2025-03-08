"use client";

import {
    useWallet,
    WalletReadyState,
    isRedirectable,
    AdapterWallet,
} from "@aptos-labs/wallet-adapter-react";
import Image from "next/image";
import { useCallback, useEffect } from "react";

export function WalletButton() {
    const { wallets, connected, disconnect, account, signMessage } = useWallet();
    const onWalletDisConnectRequest = () => {
        try {
            disconnect();
        } catch (error) {
            console.warn(error);
        }
    };
    const signMessageRequest = useCallback(async() => {
        if(!account) return;
        console.log(account)
        try {
            const signMessageResponse = await signMessage({
                message: 'This is a message from Samur-Ai',
                nonce: Math.random().toString()
            })
            console.log({
                signature: signMessageResponse.signature.toString(),
                publicKey: account.publicKey.toString(),
                address: account.address.toString(),
                message: signMessageResponse.fullMessage
            })
        } catch (error) {
            console.warn(error)
        }
    }, [account])
    useEffect(()=>{
        signMessageRequest()
    },[signMessageRequest])
    if (connected) {
        return (
            <button
                className={"btn w-100 wallet-option border-0"}
                onClick={() => onWalletDisConnectRequest()}
            >
                Disconnect
            </button>
        );
    }
    if (!wallets) {
        return (
            <div className={""}>
                Loading...
            </div>
        );
    }
    return wallets.map((wallet, index) => (
        <WalletView wallet={wallet} key={index} />
    ))
}

const WalletView = ({ wallet }: { wallet: AdapterWallet }) => {
    const { connect } = useWallet();
    const isWalletReady =
        wallet.readyState === WalletReadyState.Installed;

    const onWalletConnectRequest = async(walletName: string) => {
        try {
            connect(walletName);
        } catch (error) {
            console.warn(error);
        }
    };


    if (!isWalletReady && isRedirectable()) {
        return (
            <button
                className={"btn w-100 wallet-option border-0"}
                disabled={true}
                key={wallet.name}
            >
                <Image
                    alt={wallet.name}
                    src={wallet.icon}
                    height={20}
                    width={20}
                />
                {wallet.name} - Desktop Only
            </button>
        );
    } else {
        // desktop
        return (
            <button
                className={"btn w-100 wallet-option border-0"}
                disabled={!isWalletReady}
                key={wallet.name}
                onClick={() => onWalletConnectRequest(wallet.name)}
            >
                <Image
                    alt={wallet.name}
                    src={wallet.icon}
                    height={20}
                    width={20}
                />
                {wallet.name}
            </button>
        );
    }
};

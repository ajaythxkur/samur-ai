"use client"
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react"
import { NetworkToNetworkName } from "@aptos-labs/ts-sdk"
export function WalletProvider({ children }: { children: React.ReactNode }) {
    return (
        <AptosWalletAdapterProvider autoConnect dappConfig={{
            network: NetworkToNetworkName[process.env.NETWORK ?? "devnet"],
        }}>
            {children}
        </AptosWalletAdapterProvider>
    )
}
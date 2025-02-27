"use client"
import { useWallet } from "../../context/WalletProvider"
export function ConnectWallet(){
    const { connect, userAccount, disconnect } = useWallet();
    if(userAccount?.address) {
        return <button className="border border-dashed rounded-full p-2 px-5 hover:bg-cyan-800 transition hover:border-cyan-900" onClick={()=>disconnect()}>Disconnect {userAccount.address.toString()}</button>
    }
    return <button className="border border-dashed rounded-full p-2 px-5 hover:bg-cyan-800 transition hover:border-cyan-900" onClick={()=>connect()}>Connect Wallet</button>
     
}
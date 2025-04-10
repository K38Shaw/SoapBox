'use client'
import Image from "next/image";
import { WalletConnection, WalletConnectionStatus } from "@/app/Services";
import { useState } from "react";


const wallet = new WalletConnection();

export function WalletConnectionButton(){
    const [status, setStatus] = useState(WalletConnectionStatus.waiting);

    if (status == WalletConnectionStatus.waiting){
        return (
            <button onClick={async ()=>{
              const result = await wallet.connectToWallet()
              setStatus(result)
            }}><img src="/MetaMaskFox.svg"/></button>
        )
    }     

    if(status == WalletConnectionStatus.missingWallet){
        return (
            <div>
                <p>You are missing a wallet</p>
            </div>
        )
    }

    if(status == WalletConnectionStatus.success){
        return (
            <div>
                <p>Success</p>
            </div>


        )
    }

    if(status == WalletConnectionStatus.declined){
        return (
            <div>
                <p>The user canceled the connect</p>
            </div>
        )
    }


}
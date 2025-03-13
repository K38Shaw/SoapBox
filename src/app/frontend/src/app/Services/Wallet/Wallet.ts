import { ethers } from "ethers";

export enum WalletConnectionStatus {
    waiting,
    success,
    missingWallet,
    declined
}

export class WalletConnection {
    provider?: ethers.BrowserProvider;
    signer?: ethers.Signer;

    async connectToWallet(): Promise<WalletConnectionStatus> {
        if ((window as any).ethereum != null) {
            this.provider = new ethers.BrowserProvider((window as any).ethereum);
            try {
                this.signer = await this.provider.getSigner();
                return WalletConnectionStatus.success;
            } catch {
                return WalletConnectionStatus.declined; // User declined the connection
            }
        } else {
            return WalletConnectionStatus.missingWallet; // No wallet installed
        }
    }
}
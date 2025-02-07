import "../styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiConfig, createConfig } from "wagmi";
import { mainnet, polygon, arbitrum } from "wagmi/chains";
import { http } from "wagmi";
import { connectorsForWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { metaMaskWallet, walletConnectWallet, coinbaseWallet } from "@rainbow-me/rainbowkit/wallets";

// Définition des connecteurs
const connectors = connectorsForWallets([
  {
    groupName: "Wallets populaires",
    wallets: [
      metaMaskWallet({ projectId: "TON_PROJECT_ID" }),
      walletConnectWallet({ projectId: "TON_PROJECT_ID" }),
      coinbaseWallet({ appName: "MonProjet" }),
    ],
  },
]);

// Configuration de wagmi (nouvelle méthode sans configureChains)
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

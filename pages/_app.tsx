import type { AppProps } from 'next/app';
import { WagmiConfig, createConfig } from 'wagmi';
import { RainbowKitProvider, getDefaultWallets, darkTheme } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { createPublicClient, http } from 'viem';

// Définition du client public Viem
const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

// Configuration des wallets et du connecteur
const { connectors } = getDefaultWallets({
  appName: 'Drainerweb',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [sepolia],
});

// Création de la configuration Wagmi
const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={[sepolia]} theme={darkTheme()}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

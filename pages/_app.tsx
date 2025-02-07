import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { RainbowKitProvider, getDefaultWallets, darkTheme } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { publicProvider } from '@wagmi/core/providers/public';
import { createPublicClient, http } from 'viem';
import { WagmiConfig, createConfig } from 'wagmi';

// Définition du client public Viem
const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

// Configuration de Wagmi
const { connectors } = getDefaultWallets({
  appName: 'drainerweb',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [sepolia],
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={[sepolia]} theme={darkTheme()}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

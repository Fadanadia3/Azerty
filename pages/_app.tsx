import { AppProps } from 'next/app';
import { WagmiConfig, createConfig } from 'wagmi';
import { RainbowKitProvider, darkTheme, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { mainnet, polygon } from 'wagmi/chains';
import { injectedWallet, metaMaskWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';

// Vérification et récupération du projectId
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
if (!projectId) {
  throw new Error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID est manquant dans les variables d’environnement.');
}

// Définition des connecteurs avec WalletConnect, MetaMask, et Injected Wallet
const connectors = connectorsForWallets([
  {
    groupName: 'Recommandé',
    wallets: [
      injectedWallet({ projectId }), // Connecteur Injected Wallet
      metaMaskWallet({ projectId }), // Connecteur MetaMask
      walletConnectWallet({ projectId }), // Connecteur WalletConnect
    ],
  },
]);

// Configuration de Wagmi pour utiliser les connecteurs et les chaînes
const config = createConfig({
  autoConnect: true,
  connectors,
  chains: [mainnet, polygon], // Chaînes supportées
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

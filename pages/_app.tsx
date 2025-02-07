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

// Définition des chaînes supportées
const chains = [mainnet, polygon];

// Définition des connecteurs avec WalletConnect, MetaMask, et Injected Wallet
const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommandé',
      wallets: [
        injectedWallet({ chains }), // Connecteur Injected Wallet
        metaMaskWallet({ chains, projectId }), // Connecteur MetaMask
        walletConnectWallet({ chains, projectId }), // Connecteur WalletConnect
      ],
    },
  ],
  { appName: 'drainerweb' } // Ajout du deuxième argument obligatoire
);

// Configuration de Wagmi pour utiliser les connecteurs et les chaînes
const config = createConfig({
  autoConnect: true,
  connectors,
  chains,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider theme={darkTheme()} modalSize="compact" chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;

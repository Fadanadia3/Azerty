import { AppProps } from 'next/app';
import { WagmiConfig, createConfig } from 'wagmi';
import { RainbowKitProvider, darkTheme, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

// Vérification et récupération du projectId
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
if (!projectId) {
  throw new Error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID est manquant dans les variables d’environnement.');
}

// Configuration des chaînes
const { chains, publicClient } = configureChains([mainnet, polygon], [publicProvider()]);

// Configuration des connecteurs par défaut
const { connectors } = getDefaultWallets({
  appName: 'drainerweb',
  projectId,
  chains,
});

// Configuration de Wagmi
const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
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

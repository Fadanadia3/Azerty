import { AppProps } from 'next/app';
import { WagmiConfig, createConfig, http } from 'wagmi';
import { RainbowKitProvider, darkTheme, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { mainnet, polygon } from 'wagmi/chains';

// Vérification et récupération du projectId
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
if (!projectId) {
  throw new Error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID est manquant dans les variables d’environnement.');
}

// Définition des chaînes
const chains = [mainnet, polygon];

// Configuration des connecteurs par défaut
const { connectors } = getDefaultWallets({
  appName: 'drainerweb',
  projectId,
  chains,
});

// Création de la configuration Wagmi
const config = createConfig({
  autoConnect: true,
  connectors,
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
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

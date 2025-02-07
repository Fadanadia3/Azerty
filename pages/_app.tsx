import { AppProps } from 'next/app';
import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { RainbowKitProvider, darkTheme, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { mainnet, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

// Vérification et récupération du projectId
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
if (!projectId) {
  throw new Error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID est manquant dans les variables d’environnement.');
}

// Configuration des chaînes avec un fournisseur public
const { chains, provider } = configureChains([mainnet, polygon], [publicProvider()]);

// Configuration des connecteurs par défaut
const { connectors } = getDefaultWallets({
  appName: 'drainerweb',
  projectId,
  chains,
});

// Création de la configuration Wagmi
const client = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider theme={darkTheme()} modalSize="compact" chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;

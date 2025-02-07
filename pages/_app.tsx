import { AppProps } from 'next/app';
import { WagmiConfig, createClient, configureChains, mainnet, polygon } from 'wagmi/core'; // Correction ici
import { RainbowKitProvider, connectorsForWallets, darkTheme } from '@rainbow-me/rainbowkit';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

// Configuration des chaînes (mainnet et polygon)
const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, polygon],
  [
    // Tu peux ajouter des fournisseurs de services comme Infura, Alchemy ici
    // par exemple avec createPublicProvider(), ou un autre fournisseur
  ]
);

// Création du client wagmi
const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme()}
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;

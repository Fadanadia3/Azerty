import { AppProps } from 'next/app';
import { WagmiConfig, createClient, configureChains, mainnet, polygon } from 'wagmi';
import { RainbowKitProvider, connectorsForWallets, darkTheme } from '@rainbow-me/rainbowkit';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import '@rainbow-me/rainbowkit/styles.css'; // N'oublie pas d'importer le CSS de RainbowKit

const { chains, provider } = configureChains(
  [mainnet, polygon],
  [
    // Tu peux ajouter ici des fournisseurs comme Infura, Alchemy, etc.
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: "Wallets populaires",
    wallets: [
      {
        id: 'metamask',
        name: 'MetaMask',
        iconUrl: async () => '/metamask.svg', // Remplace par l'URL de ton icône
        iconBackground: '#E8831D',
        createConnector: () => new InjectedConnector({ chains }),
      },
      {
        id: 'walletConnect',
        name: 'WalletConnect',
        iconUrl: async () => '/walletconnect.svg', // Remplace par l'URL de ton icône
        iconBackground: '#3B99FC',
        createConnector: () => new WalletConnectConnector({ chains, options: { qrcode: true } }),
      },
      // Ajoute d'autres wallets ici selon ton besoin
    ],
  },
]);

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;

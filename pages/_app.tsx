import { AppProps } from 'next/app';
import { WagmiConfig, createConfig, http } from 'wagmi';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { mainnet, polygon } from 'wagmi/chains';
import { connectorsForWallets, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { injectedWallet, metaMaskWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';

// Configuration des connecteurs WalletConnect, MetaMask et Injected Wallet
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

const connectors = connectorsForWallets([
  {
    groupName: 'Recommandé',
    wallets: [
      injectedWallet({ projectId }),
      metaMaskWallet({ projectId }),
      walletConnectWallet({ projectId }),
    ],
  },
]);

// Configuration de Wagmi
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
      <RainbowKitProvider theme={darkTheme()} modalSize="compact">
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;

import { AppProps } from 'next/app';
import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { RainbowKitProvider, getDefaultWallets, darkTheme } from '@rainbow-me/rainbowkit';
import { mainnet, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

// Configuration de Wagmi pour gérer les chaînes et les connecteurs
const { chains, provider } = configureChains([mainnet, polygon], [
  publicProvider(),
]);

const { connectors } = getDefaultWallets({
  appName: 'MyWeb3App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;

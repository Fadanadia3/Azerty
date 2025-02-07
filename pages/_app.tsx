import { AppProps } from 'next/app';
import { WagmiConfig, createClient, configureChains, mainnet, polygon } from 'wagmi/core';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';

// Configuration des chaînes (mainnet et polygon)
const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, polygon],
  []
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
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;

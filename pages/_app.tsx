import { AppProps } from 'next/app';
import { WagmiConfig, createConfig, configureChains } from 'wagmi'; // Import createConfig
import { RainbowKitProvider, darkTheme, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { mainnet, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
if (!projectId) {
  throw new Error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID est manquant dans les variables d’environnement.');
}

const { chains, publicClient } = configureChains(
  [mainnet, polygon],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'drainerweb',
  projectId,
  chains
});

const config = createConfig({ // Use createConfig
  autoConnect: true,
  connectors,
  publicClient, // Use publicClient here
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}> {/* Pass config to WagmiConfig */}
      <RainbowKitProvider theme={darkTheme()} modalSize="compact" chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;

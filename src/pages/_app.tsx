import { useEffect } from "react";
import { AppProps } from 'next/app';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { base } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import Navbar from "../components/menu/Navbar";
import BottomMenu from "../components/menu/BottomMenu";
import "../styles/globals.css";


const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  ssr: true,
  connectors: [injected()],
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Akses `window` atau SDK di sini
      import('@twa-dev/sdk').then((WebApp) => {
        WebApp.default.ready(); // Menggunakan WebApp di client-side
      });
    }

  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div>
          <Navbar />
          <div className="pt-2 pb-20">
            <Component {...pageProps} />
          </div>
          <BottomMenu />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;

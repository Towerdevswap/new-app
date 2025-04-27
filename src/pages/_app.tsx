import { useEffect } from "react";
import { AppProps } from 'next/app'; // Import AppProps type from next/app
import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { base } from 'wagmi/chains';
import { injected } from 'wagmi/connectors'; // perlu import connector
import WebApp from '@twa-dev/sdk';
import Navbar from "../components/menu/Navbar";
import BottomMenu from "../components/menu/BottomMenu";
import "../styles/globals.css";

const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  ssr: true,
  connectors: [injected()], // ini sebagai pengganti autoConnect
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
      WebApp.ready();  // Inisialisasi WebApp hanya ketika konteks Telegram Web App tersedia
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

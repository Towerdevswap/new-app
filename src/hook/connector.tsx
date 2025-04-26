import { useConnect, useDisconnect, useAccount } from 'wagmi';
// import { WalletConnectConnector } from "wagmi/connectors/walletConnectV2";

export const useWalletConnector = () => {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  const walletConnectConnector = connectors.find(
    (c) => c.name === 'WalletConnect'
  );

  const connectWallet = async () => {
    if (!walletConnectConnector) {
      console.error('WalletConnect connector not found');
      return;
    }
    await connect({ connector: walletConnectConnector });
  };

  const disconnectWallet = async () => {
    await disconnect();
  };

  return {
    connectWallet,
    disconnectWallet,
    address,
    isConnected,
  };
};

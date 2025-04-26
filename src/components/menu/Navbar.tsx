import { useWalletConnector } from "../../hook/connector";

const Navbar = () => {
  const { connectWallet, address, isConnected } = useWalletConnector();

  const handleWalletClick = () => {
    if (isConnected) {
      // bisa buka setting kalau mau
      console.log("Already connected:", address);
    } else {
      connectWallet();
    }
  };

  // Fungsi untuk potong address misal 0xABC...123
  const shortenAddress = (addr: string) => {
    return addr.slice(0, 4) + "..." + addr.slice(-4);
  };

  return (
    <div className="flex justify-between bg-white border-b-2 items-center px-2 py-2 border-b shadow-sm">
      <div className="font-bold text-2xl text-black">🪙 BitBase</div>

      <button
        onClick={handleWalletClick}
        className="flex items-center gap-2 text-black bg-transparent border-none"
      >
        {isConnected ? (
          <span className="font-semibold">{shortenAddress(address || "")}</span>
        ) : (
          <img src="/images/wallet.svg" className="h-8 w-8" alt="Wallet" />
        )}
      </button>
    </div>
  );
};

export default Navbar;

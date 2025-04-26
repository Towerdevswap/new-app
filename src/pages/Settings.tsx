import Header from "../components/Header";

const Settings = () => {
  return (
    <>
      <Header title="Profile" />
      <div className="p-4 space-y-2">
        <p><strong>Nama:</strong> John Doe</p>
        <p><strong>Username:</strong> @johndoe</p>
        <p><strong>Wallet:</strong> 0x123...456</p>
      </div>
    </>
  );
};

export default Settings;

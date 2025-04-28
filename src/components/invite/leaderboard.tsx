import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type User = {
  rank: number;
  username: string;
  rewards: number; // dalam BB
};

const dummyData: User[] = [
  { rank: 1, username: "KingBull", rewards: 1200 },
  { rank: 2, username: "CryptoQueen", rewards: 950 },
  { rank: 3, username: "BullMaster", rewards: 850 },
  { rank: 4, username: "FastTrader", rewards: 800 },
  { rank: 5, username: "LuckyBull", rewards: 750 },
];

const LeaderboardPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Langsung mengimpor WebApp dari @twa-dev/sdk tanpa menggunakan dynamic
    import('@twa-dev/sdk').then((WebAppModule) => {
      const WebApp = WebAppModule.default; // Memastikan menggunakan WebApp dari SDK
      if (WebApp && WebApp.initDataUnsafe) {
        const userData = WebApp.initDataUnsafe.user;
        if (userData && userData.first_name) { // <- sudah bener sekarang
          setUsername(userData.first_name || null);
        }
      }
    }).catch((error) => {
      console.error("Error loading WebApp module:", error);
    });
  }, []);

  useEffect(() => {
    // Simulasi fetching data
    setTimeout(() => {
      setUsers(dummyData);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-white p-2">
    <div onClick={() => router.push("/invite")} className="pb-4 flex space-x-2 pt-2 items-center">
      <img src="/images/arrowback.svg" className="w-4 h-4" />
      <p className="text-lg"> Back </p>
    </div>
     <div className="flex card-bg justify-around items-center border py-4 rounded-xl mb-4 ">
      <h1 className="text-xl text-white font-bold">Leaderboard</h1>
      <img
      src="https://cdn3d.iconscout.com/3d/premium/thumb/winner-podium-3d-icon-download-in-png-blend-fbx-gltf-file-formats--leaderboard-champion-stage-festival-pack-days-icons-5805516.png?f=webp"
      className="w-40 h-24" />
     </div>

     <div className="flex my-2 justify-between items-center border-gray-600 border p-2 rounded-xl">
       <div className="flex items-center">
         <img
           src="/images/avatar-placeholder.jpg"// Menampilkan foto profil atau gambar placeholder
           className="h-10 w-10 rounded-full mr-2"
           alt="Profile"
         />
         <div>
           <p className="text-lg">{username || "Username"}</p> {/* Menampilkan username */}
           <p className="text-sm flex items-center"><img src="/images/logo.png" className="h-4 w-4 mr-1" />0.100 $BB</p> {/* Menampilkan saldo */}
         </div>
       </div>
       <p className="pr-2">
        My Rank #120
       </p>
     </div>

      <h1 className="text-lg mx-2"> Top Users </h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto py-2">
          <tbody className="text-gray-700 text-sm font-light">
            {users.map((user) => (
              <tr key={user.rank} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 pl-4">{user.rank}</td>
                <td className="py-3 pr-4">@{user.username}</td>
                <td className="py-3 px-4 text-end">{user.rewards} $BB</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardPage;

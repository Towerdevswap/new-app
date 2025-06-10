import { useRouter } from "next/router";
import { FaTasks } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { MdOutlineExplore, MdOutlineGamepad } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
// import { GiMining } from "react-icons/gi";
import MenuButton from "./MenuButton";

const BottomMenu = () => {
  const router = useRouter();
  const current = router.pathname === "/" ? "home" : router.pathname.replace("/", "");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl border-t-2 bg-white">
      <div className="grid grid-cols-5 gap-2 text-center p-2 text-xs border-none">
        <MenuButton
          icon={<GoHome />}
          label="Home"
          active={current === "home"}
          onClick={() => router.push("/")}
        />
        <MenuButton
          icon={<MdOutlineExplore />}
          label="Explore"
          active={current === "explore"}
          onClick={() => router.push("/explore")}
        />
        <MenuButton
          icon={<MdOutlineGamepad />}
          label="Game"
          active={current === "game"}
          onClick={() => router.push("/game")}
        />
        {/* <MenuButton
          icon={<GiMining />}
          label="Mining"
          active={current === "mining"}
          onClick={() => router.push("/mining")}
          className={`rounded-2xl p-1 ${
            current === "mining"
              ? "bg-gradient-to-br from-yellow-300 to-yellow-500 text-white shadow-2xl scale-110"
              : "bg-yellow-100 text-yellow-700"
          }`}
         /> */}
        <MenuButton
          icon={<FaTasks />}
          label="Tasks"
          active={current === "tasks"}
          onClick={() => router.push("/tasks")}
        />
        <MenuButton
          icon={<CgProfile />}
          label="Profile"
          active={current === "profile"}
          onClick={() => router.push("/profile")}
        />
      </div>
    </div>
  );
};

export default BottomMenu;

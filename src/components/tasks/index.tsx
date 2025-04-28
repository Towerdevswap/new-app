import { useState } from "react";
import { FaTwitter, FaTelegramPlane, FaCheckCircle } from "react-icons/fa";
import { TfiGift } from "react-icons/tfi";

interface Task {
  id: string;
  label: string;
  actionText: string;
  reward: number; // hash rate
  onClick: () => void;
  completed: boolean;
}

const Tasks = () => {
  const [availableTasks, setAvailableTasks] = useState<Task[]>([
    {
      id: "daily",
      label: "Daily Gift",
      actionText: "Claim",
      reward: 2,
      completed: false,
      onClick: () => window.open("https://twitter.com/your_project", "_blank"),
    },
    {
      id: "follow-twitter",
      label: "Follow us on Twitter",
      actionText: "Follow",
      reward: 10,
      completed: false,
      onClick: () => window.open("https://twitter.com/your_project", "_blank"),
    },
    {
      id: "join-telegram",
      label: "Join our Telegram",
      actionText: "Join",
      reward: 15,
      completed: false,
      onClick: () => window.open("https://t.me/your_project", "_blank"),
    },
    {
      id: "anti-bot",
      label: "Prove you're human",
      actionText: "Start",
      reward: 15,
      completed: false,
      onClick: () => window.open("https://t.me/your_project", "_blank"),
    },
    {
      id: "connect-wallet",
      label: "Connect to Metamask",
      actionText: "Start",
      reward: 30,
      completed: false,
      onClick: () => window.open("https://t.me/your_project", "_blank"),
    },
  ]);

  const [claimedTasks, setClaimedTasks] = useState<Task[]>([]);

  const handleComplete = (id: string) => {
    setAvailableTasks((prev) => {
      const taskIndex = prev.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        const updatedTask = { ...prev[taskIndex], completed: true };
        const updatedAvailableTasks = [...prev];
        updatedAvailableTasks[taskIndex] = updatedTask;

        // Move the completed task to claimed
        setClaimedTasks((claimedPrev) => [...claimedPrev, updatedTask]);

        return updatedAvailableTasks.filter((task) => task.id !== id); // Remove the task from available
      }
      return prev;
    });
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">Earn more hash</h2>

      {/* Available Tasks Section */}
      <div className="flex justify-between bg-gray-200 px-4 py-2 mt-4 border rounded-xl mx-2">
        <p>Available</p>
      </div>
      {availableTasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between px-4 py-1 border rounded-xl bg-white shadow"
        >
          <div className="flex items-center space-x-2">
            {task.id === "daily" && <TfiGift className="text-blue-500 text-2xl" />}
            {task.id === "follow-twitter" && <FaTwitter className="text-blue-500 text-2xl" />}
            {task.id === "join-telegram" && <FaTelegramPlane className="text-blue-600 text-2xl" />}
            {task.id === "anti-bot" && <FaTelegramPlane className="text-blue-600 text-2xl" />}
            {task.id === "connect-wallet" && <FaTelegramPlane className="text-blue-600 text-2xl" />}
            <div>
              <p className="font-semibold">{task.label}</p>
              <p className="text-sm text-gray-500">+{task.reward} Hash Rate</p>
            </div>
          </div>

          {task.completed ? (
            <div className="flex items-center text-green-600 space-x-1">
              <FaCheckCircle />
            </div>
          ) : (
            <button
              onClick={() => {
                task.onClick();
                handleComplete(task.id);
              }}
              className="text-white px-4 py-2 rounded-2xl"
            >
              <img src="/images/arrowtask.svg" className="h-5 w-5" />
            </button>
          )}
        </div>
      ))}

      {/* Claimed Tasks Section */}
      <div className="flex justify-between bg-gray-200 px-4 py-2 mt-4 border rounded-xl mx-2">
        <p>Claimed</p>
      </div>
      {claimedTasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between px-4 py-1 border rounded-xl bg-white shadow"
        >
          <div className="flex items-center space-x-3">
            {task.id === "daily" && <TfiGift className="text-blue-500 text-2xl" />}
            {task.id === "follow-twitter" && <FaTwitter className="text-blue-500 text-2xl" />}
            {task.id === "join-telegram" && <FaTelegramPlane className="text-blue-600 text-2xl" />}
            {task.id === "anti-bot" && <FaTelegramPlane className="text-blue-600 text-2xl" />}
            {task.id === "connect-wallet" && <FaTelegramPlane className="text-blue-600 text-2xl" />}
            <div>
              <p className="font-semibold">{task.label}</p>
              <p className="text-sm text-gray-500">+{task.reward} Hash Rate</p>
            </div>
          </div>

          <div className="flex items-center text-green-600 space-x-1">
            <FaCheckCircle />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;

// components/Tasks.tsx
import { useState } from "react";
import { FaTwitter, FaTelegramPlane, FaCheckCircle } from "react-icons/fa";

interface Task {
  id: string;
  label: string;
  actionText: string;
  reward: number; // hash rate
  onClick: () => void;
  completed: boolean;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
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
  ]);

  const handleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">Earn more hash</h2>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between px-4 py-2 border rounded-xl bg-white shadow"
        >
          <div className="flex items-center space-x-3">
            {task.id === "follow-twitter" && <FaTwitter className="text-blue-500" />}
            {task.id === "join-telegram" && <FaTelegramPlane className="text-blue-600" />}
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
    </div>
  );
};

export default Tasks;

import { useState, useEffect } from "react";
import { id } from "../../utils/telegram";
import API_URL from '../../config/apiUrl';
import { FaTwitter, FaTelegramPlane, FaCheckCircle, FaShieldAlt, FaWallet } from "react-icons/fa";
import { TfiGift } from "react-icons/tfi";

type TaskIcon = 'gift' | 'twitter' | 'telegram' | 'shield' | 'wallet';

interface Task {
  id: string;
  label: string;
  reward: number;
  completed: boolean;
  isDaily: boolean;
  canClaimAfter?: string;
  icon: TaskIcon;  // Changed from string to TaskIcon
  url: string;
}

const Tasks = () => {
  const userId = id;
  const [availableTasks, setAvailableTasks] = useState<Task[]>([]);
  const [claimedTasks, setClaimedTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${API_URL}/tasks/${userId}`);
        const data = await response.json();

        if (data.success) {
          setAvailableTasks(data.data.availableTasks);
          setClaimedTasks(data.data.claimedTasks);
        }
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId]);

  const handleComplete = async (taskId: string) => {
    try {
      const task = availableTasks.find(t => t.id === taskId);
      if (!task) return;

      if (task.completed && task.isDaily && task.canClaimAfter) {
        const now = new Date();
        const canClaimAfter = new Date(task.canClaimAfter);

        if (now.getTime() < canClaimAfter.getTime()) {
          const hoursLeft = Math.ceil((canClaimAfter.getTime() - now.getTime()) / (1000 * 60 * 60));
          alert(`You can claim this again in ${hoursLeft} hours`);
          return;
        }
      }

      const response = await fetch(`${API_URL}/tasks/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, taskId })
      });

      const data = await response.json();

      if (data.success) {
        if (task.isDaily) {
          setAvailableTasks(prev => prev.map(t =>
            t.id === task.id ? { ...t, canClaimAfter: data.canClaimAfter } : t
          ));
        } else {
          setAvailableTasks(prev => prev.filter(t => t.id !== task.id));
          setClaimedTasks(prev => [...prev, { ...task, completed: true }]);
        }

        alert(`Success! You earned +${data.reward} Hash Rate`);
      }
    } catch (error) {
      console.error("Failed to complete task:", error);
    }
  };

  const getTaskIcon = (icon: string) => {
    switch (icon) {
      case 'gift': return <TfiGift className="text-blue-500 text-2xl" />;
      case 'twitter': return <FaTwitter className="text-blue-500 text-2xl" />;
      case 'telegram': return <FaTelegramPlane className="text-blue-600 text-2xl" />;
      case 'shield': return <FaShieldAlt className="text-blue-600 text-2xl" />;
      case 'wallet': return <FaWallet className="text-blue-600 text-2xl" />;
      default: return <TfiGift className="text-blue-500 text-2xl" />;
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading tasks...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">Earn more hash</h2>

      {/* Available Tasks Section */}
      <div className="flex justify-between bg-gray-200 px-4 py-2 mt-4 border rounded-xl mx-2">
        <p>Available</p>
      </div>
      {availableTasks.length > 0 ? (
        availableTasks.map((task) => (
        <div key={task.id} className="flex items-center justify-between px-4 py-3 border rounded-xl bg-white shadow">
          <div className="flex items-center space-x-3">
            {getTaskIcon(task.icon)}
            <div>
              <p className="font-semibold">{task.label}</p>
              <p className="text-sm text-gray-500">+{task.reward} Hash Rate</p>
              {task.completed && task.isDaily && task.canClaimAfter && (
                <p className="text-xs text-yellow-600">
                  Available again at: {new Date(task.canClaimAfter).toLocaleString()}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              window.open(task.url, '_blank');
              handleComplete(task.id);
            }}
            className="text-white px-4 py-2 rounded-2xl"
            disabled={task.completed && task.isDaily && !!task.canClaimAfter && new Date() < new Date(task.canClaimAfter)}
          >
            <img
              src="/images/arrowtask.svg"
              className="h-5 w-5"
              style={{
                opacity: task.completed && task.isDaily && !!task.canClaimAfter && new Date() < new Date(task.canClaimAfter) ? 0.5 : 1
              }}
            />
          </button>
        </div>
      ))
      ) : (
        <p className="text-center text-gray-500 py-4">No available tasks</p>
      )}

      {/* Claimed Tasks Section */}
      <div className="flex justify-between bg-gray-200 px-4 py-2 mt-4 border rounded-xl mx-2">
        <p>Claimed</p>
      </div>
      {claimedTasks.length > 0 ? (
        claimedTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between px-4 py-3 border rounded-xl bg-white shadow"
          >
            <div className="flex items-center space-x-3">
              {getTaskIcon(task.icon)}
              <div>
                <p className="font-semibold">{task.label}</p>
                <p className="text-sm text-gray-500">+{task.reward} Hash Rate</p>
              </div>
            </div>

            <div className="flex items-center text-green-600 space-x-1">
              <FaCheckCircle />
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 py-4">No claimed tasks yet</p>
      )}
    </div>
  );
};

export default Tasks;

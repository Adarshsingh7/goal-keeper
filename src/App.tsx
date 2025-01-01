import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, Share2, Trash2, Edit, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast, Toaster } from "sonner";
import EditTaskModal from "./components/EditTaskModal";

interface Task {
  id: string;
  name: string;
  description: string;
}

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tasks, setTasks] = useState<Task[]>(() => {
    const tasksParam = searchParams.get("tasks");
    return tasksParam ? JSON.parse(atob(tasksParam)) : [];
  });
  const [newTask, setNewTask] = useState({ name: "", description: "" });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const encodedTasks = btoa(JSON.stringify(tasks));
    setSearchParams({ tasks: encodedTasks });
  }, [tasks, setSearchParams]);

  const addTask = () => {
    if (newTask.name && newTask.description) {
      setTasks([...tasks, { ...newTask, id: Date.now().toString() }]);
      setNewTask({ name: "", description: "" });
      toast.success("Goal added successfully!", {
        icon: "✅",
      });
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.success("Goal deleted successfully!", {
      icon: "🗑️",
    });
  };

  const editTask = (task: Task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
    setIsEditModalOpen(false);
    toast.success("Goal updated successfully!", {
      icon: "✏️",
    });
  };

  const createNewList = () => {
    setTasks([]);
    toast.success("New list created!", {
      icon: "📝",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4 sm:p-6 md:p-8 overflow-x-hidden">
      <Toaster />
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-8 text-white drop-shadow-lg"
        >
          Goal Keeper 🥅
        </motion.h1>

        <Card className="mb-8 bg-white/90 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-extrabold text-purple-600">
              Add New Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                placeholder="Goal Name"
                value={newTask.name}
                onChange={(e) =>
                  setNewTask({ ...newTask, name: e.target.value })
                }
                className="border-2 border-purple-300 focus:border-purple-500"
              />
              <Input
                placeholder="Goal Description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                className="border-2 border-purple-300 focus:border-purple-500"
              />
            </div>
          </CardContent>
          <CardFooter>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <Button
                onClick={addTask}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Goal
              </Button>
            </motion.div>
          </CardFooter>
        </Card>

        <div className="space-y-4">
          <AnimatePresence>
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl font-bold text-purple-600 flex items-center justify-between">
                      <span>{task.name}</span>
                      <span className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => editTask(task)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteTask(task.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{task.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1"
          >
            <Button
              onClick={() =>
                navigator.clipboard.writeText(window.location.href)
              }
              variant="outline"
              className="w-full bg-white text-purple-600 font-bold py-2 px-4 rounded border-2 border-purple-400 hover:bg-purple-100"
            >
              <Share2 className="mr-2 h-4 w-4" /> Copy Link
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1"
          >
            <Button
              onClick={createNewList}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-2 px-4 rounded"
            >
              <RefreshCw className="mr-2 h-4 w-4" /> New List
            </Button>
          </motion.div>
        </div>
      </div>

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={updateTask}
        task={editingTask}
      />
    </div>
  );
}

export default App;

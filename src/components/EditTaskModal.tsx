import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Task {
  id: string;
  name: string;
  description: string;
}

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  task: Task | null;
}

export default function EditTaskModal({
  isOpen,
  onClose,
  onSubmit,
  task,
}: EditTaskModalProps) {
  const [editedTask, setEditedTask] = useState<Task>({
    id: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    if (task) {
      setEditedTask(task);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(editedTask);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/95 backdrop-blur-md shadow-xl rounded-lg w-full max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-extrabold text-purple-600">
            Edit Goal
          </DialogTitle>
          <Button
            variant="ghost"
            className="absolute right-4 top-4 text-purple-500 hover:text-purple-700"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Goal Name"
            value={editedTask.name}
            onChange={(e) =>
              setEditedTask({ ...editedTask, name: e.target.value })
            }
            className="border-2 border-purple-300 focus:border-purple-500"
          />
          <Input
            placeholder="Goal Description"
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
            className="border-2 border-purple-300 focus:border-purple-500"
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded"
            >
              Update Goal
            </Button>
          </motion.div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

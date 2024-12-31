import { useState } from "react";
import { motion } from "framer-motion";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}

export default function EmailModal({
  isOpen,
  onClose,
  onSubmit,
}: EmailModalProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
    setEmail("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/95 backdrop-blur-md shadow-xl rounded-lg w-full max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-extrabold text-purple-600">
            Share Your Goals 🥅
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
            type="email"
            placeholder="friend@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-2 border-purple-300 focus:border-purple-500"
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded"
            >
              <Send className="mr-2 h-4 w-4" /> Share Goals
            </Button>
          </motion.div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

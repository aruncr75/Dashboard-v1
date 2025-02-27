import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface EditTaskDialogProps {
  taskTitle: string;
  taskStatus: string;
  onEdit: (newTitle: string, newStatus: string) => void;
}

export const EditTaskDialog: React.FC<EditTaskDialogProps> = ({ taskTitle, taskStatus, onEdit }) => {
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(taskTitle);
  const [newStatus, setNewStatus] = useState(taskStatus);

  useEffect(() => {
    setNewTitle(taskTitle);
    setNewStatus(taskStatus);
  }, [taskTitle, taskStatus]);
  
  const handleSubmit = () => {
    if ((newTitle && newTitle !== taskTitle) || newStatus !== taskStatus) {
      onEdit(newTitle, newStatus);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <span className="text-blue-500">Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>Update the task title and status below.</DialogDescription>
        </DialogHeader>
        <Input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="mt-2"
          placeholder="Task Title"
        />
        <div className="mt-2">
          <Select value={newStatus} onValueChange={setNewStatus}>
            <SelectTrigger>
              <SelectValue>{newStatus}</SelectValue> {/* Now displays current status as default */}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;

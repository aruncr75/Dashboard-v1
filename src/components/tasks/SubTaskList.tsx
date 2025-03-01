import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Plus } from "lucide-react";
import { SubTask } from "@/store/tasksStore";

interface SubTaskListProps {
  taskId: number;
  subtasks: SubTask[];
  onAdd: (taskId: number, title: string) => void;
  onToggle: (taskId: number, subtaskId: number) => void;
  onDelete: (taskId: number, subtaskId: number) => void;
}

export const SubTaskList: React.FC<SubTaskListProps> = ({
  taskId,
  subtasks,
  onAdd,
  onToggle,
  onDelete
}) => {
  const [newSubtask, setNewSubtask] = useState('');

  const handleAddSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSubtask.trim()) {
      onAdd(taskId, newSubtask.trim());
      setNewSubtask('');
    }
  };

  return (
    <div className="mt-4 space-y-4">
      <form onSubmit={handleAddSubtask} className="flex gap-2">
        <Input
          value={newSubtask}
          onChange={(e) => setNewSubtask(e.target.value)}
          placeholder="Add subtask..."
          className="flex-1"
        />
        <Button type="submit" size="sm">
          <Plus className="w-4 h-4" />
        </Button>
      </form>
      
      <div className="space-y-3">
        {subtasks.map((subtask) => (
          <div key={subtask.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
            <Checkbox
              checked={subtask.completed}
              onCheckedChange={() => onToggle(taskId, subtask.id)}
            />
            <span className={`flex-1 text-sm ${subtask.completed ? 'line-through text-gray-400' : 'text-white'}`}>
              {subtask.title}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(taskId, subtask.id)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

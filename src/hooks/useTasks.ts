import { useState, useEffect } from 'react';

export interface Task {
  id: number;
  title: string;
  status: string;
  progress: number;
}

const STORAGE_KEY = 'dashboard-tasks';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [
      { id: 1, title: "Update documentation", status: "Completed", progress: 100 },
      { id: 2, title: "Review pull requests", status: "Todo", progress: 0 },
      { id: 3, title: "Prepare presentation", status: "In Progress", progress: 30 },
      { id: 4, title: "Update website content", status: "Completed", progress: 100 },
    ];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask: { title: string; status: string }) => {
    const progress = newTask.status === "Completed" ? 100 : 
                    newTask.status === "In Progress" ? 30 : 0;
    
    setTasks(prevTasks => [...prevTasks, {
      id: Math.max(0, ...prevTasks.map(t => t.id)) + 1,
      title: newTask.title,
      status: newTask.status,
      progress
    }]);
  };

  return { tasks, addTask };
}

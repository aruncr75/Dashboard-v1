import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Task {
  id: number;
  title: string;
  status: string;
  progress: number;
}

interface TasksState {
  tasks: Task[];
  addTask: (task: { title: string; status: string }) => void;
  deleteTask: (id: number) => void;
}

export const useTasksStore = create<TasksState>()(
  persist(
    (set, get) => ({
      tasks: [
        { id: 1, title: "Update documentation", status: "Completed", progress: 100 },
        { id: 2, title: "Review pull requests", status: "Todo", progress: 0 },
        { id: 3, title: "Prepare presentation", status: "In Progress", progress: 30 },
        { id: 4, title: "Update website content", status: "Completed", progress: 100 },
      ],
      addTask: (newTask) => {
        const progress =
          newTask.status === "Completed" ? 100 :
          newTask.status === "In Progress" ? 30 : 0;
        const tasks = get().tasks;
        const newId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
        set({ tasks: [...tasks, { id: newId, title: newTask.title, status: newTask.status, progress }] });
      },
      deleteTask: (id) => set({ tasks: get().tasks.filter(task => task.id !== id) })
    }),
    { name: 'dashboard-tasks' }
  )
);

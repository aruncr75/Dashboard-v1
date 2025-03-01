import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SubTask {
  id: number;
  title: string;
  completed: boolean;
}

export interface Task {
  id: number;
  title: string;
  status: string;
  progress: number;
  subtasks: SubTask[];
}

interface TasksState {
  tasks: Task[];
  addTask: (task: { title: string; status: string }) => void;
  deleteTask: (id: number) => void;
  updateTaskStatus: (id: number, newStatus: string) => void;
  editTask: (id: number, newTitle: string, newStatus: string) => void;
  addSubTask: (taskId: number, subtaskTitle: string) => void;
  toggleSubTask: (taskId: number, subtaskId: number) => void;
  deleteSubTask: (taskId: number, subtaskId: number) => void;
  addMorningRoutine: () => void;
}

export const useTasksStore = create<TasksState>()(
  persist(
    (set, get) => ({
      tasks: [
        { 
          id: 1, 
          title: "Update documentation", 
          status: "Pending", 
          progress: 0,
          subtasks: [
            { id: 1, title: "Review current docs", completed: false },
            { id: 2, title: "Update API sections", completed: false }
          ]
        },
        { id: 2, title: "Review pull requests", status: "Pending", progress: 0, subtasks: [] },
        { id: 3, title: "Prepare presentation", status: "Pending", progress: 0, subtasks: [] },
        { id: 4, title: "Update website content", status: "Completed", progress: 100, subtasks: [] },
      ],
      addTask: (newTask) => {
        const progress = newTask.status === "Completed" ? 100 :
                        newTask.status === "In Progress" ? 30 : 0;
        const tasks = get().tasks;
        const newId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
        set({ 
          tasks: [...tasks, { 
            id: newId, 
            title: newTask.title, 
            status: newTask.status, 
            progress,
            subtasks: [] 
          }] 
        });
      },
      deleteTask: (id) => set({ tasks: get().tasks.filter(task => task.id !== id) }),
      updateTaskStatus: (id, newStatus) => {
        const newProgress = newStatus === "Completed" ? 100 :
                            newStatus === "In Progress" ? 30 : 0;
        set({
          tasks: get().tasks.map(task =>
            task.id === id ? { ...task, status: newStatus, progress: newProgress } : task
          )
        });
      },
      editTask: (id, newTitle, newStatus) =>
        set({
          tasks: get().tasks.map(task =>
            task.id === id ? { ...task, title: newTitle, status: newStatus, subtasks: task.subtasks } : task
          )
        }),
      addSubTask: (taskId, subtaskTitle) => {
        const tasks = get().tasks;
        set({
          tasks: tasks.map(task => {
            if (task.id === taskId) {
              const newSubtaskId = task.subtasks.length ? 
                Math.max(...task.subtasks.map(st => st.id)) + 1 : 1;
              return {
                ...task,
                subtasks: [...task.subtasks, {
                  id: newSubtaskId,
                  title: subtaskTitle,
                  completed: false
                }]
              };
            }
            return task;
          })
        });
      },

      toggleSubTask: (taskId, subtaskId) => {
        const tasks = get().tasks;
        set({
          tasks: tasks.map(task => {
            if (task.id === taskId) {
              const updatedSubtasks = task.subtasks.map(st =>
                st.id === subtaskId ? { ...st, completed: !st.completed } : st
              );
              const completedCount = updatedSubtasks.filter(st => st.completed).length;
              const progress = task.subtasks.length ? 
                Math.round((completedCount / task.subtasks.length) * 100) : 
                task.progress;
              return {
                ...task,
                subtasks: updatedSubtasks,
                progress
              };
            }
            return task;
          })
        });
      },

      deleteSubTask: (taskId, subtaskId) => {
        const tasks = get().tasks;
        set({
          tasks: tasks.map(task => {
            if (task.id === taskId) {
              const updatedSubtasks = task.subtasks.filter(st => st.id !== subtaskId);
              const completedCount = updatedSubtasks.filter(st => st.completed).length;
              const progress = updatedSubtasks.length ? 
                Math.round((completedCount / updatedSubtasks.length) * 100) : 
                task.progress;
              return {
                ...task,
                subtasks: updatedSubtasks,
                progress
              };
            }
            return task;
          })
        });
      },
      addMorningRoutine: () =>
        set((state) => {
          const tasks = state.tasks;
          const newId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
          const subtasks = [
            {
              id: 1,
              title: "⏰ Wake Up Early - Task 5.1: Set your alarm for 6:00 AM. Place it away from your bed to encourage getting up.",
              completed: false,
            },
            {
              id: 2,
              title: "💧 Hydrate - Task 6.1: Immediately after waking, drink a full glass of water.",
              completed: false,
            },
            {
              id: 3,
              title: "🧘‍♂️ Meditation - Task 7.1: Find a quiet space, sit comfortably, and focus on your breathing or use a meditation app.",
              completed: false,
            },
            {
              id: 4,
              title: "🔊 Affirmations - Task 8.1: Repeat positive statements to boost your focus, productivity, and self-belief.",
              completed: false,
            },
            {
              id: 5,
              title: "👁️‍🗨️ Visualization - Task 9.1: Visualize success by imagining yourself efficiently completing your 'Rule of 5' tasks.",
              completed: false,
            },
            {
              id: 6,
              title: "💪 Exercise - Task 10.1: Perform a quick workout (e.g., yoga, stretching, bodyweight exercises, or a short jog).",
              completed: false,
            },
            {
              id: 7,
              title: "📚 Reading - Task 11.1: Read for personal growth; focus on professional development or inspirational content.",
              completed: false,
            },
            {
              id: 8,
              title: "🖊️ Journaling - Task 12.1: Write reflections, note insights from reading, and jot down work ideas.",
              completed: false,
            },
            {
              id: 9,
              title: "📋 Planning - Task 13.1: Review and prioritize your 'Rule of 5' tasks and schedule them into your day.",
              completed: false,
            },
            {
              id: 10,
              title: "🍽️ Healthy Breakfast - Task 14.1: Prepare a nutritious meal with proteins, whole grains, and fruits or vegetables.",
              completed: false,
            },
          ];
          const newTask = {
            id: newId,
            title: "Morning Routine",
            status: "Pending",
            progress: 0,
            subtasks,
          };
          return { tasks: [...tasks, newTask] };
        }),
    }),
    { name: 'dashboard-tasks' }
  )
);

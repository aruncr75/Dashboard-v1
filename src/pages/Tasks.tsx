import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, CheckCircle2, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { CreateTaskDialog } from "@/components/tasks/CreateTaskDialog";
import { DeleteTaskDialog } from "@/components/tasks/DeleteTaskDialog";
import { useTasks } from "@/hooks/useTasks";

interface Task {
  id: number;
  title: string;
  status: string;
  progress: number;
}

const initialTasks = [
  { id: 1, title: "Update documentation", status: "Completed", progress: 100 },
  { id: 2, title: "Review pull requests", status: "Todo", progress: 0 },
  { id: 3, title: "Prepare presentation", status: "In Progress", progress: 30 },
  { id: 4, title: "Update website content", status: "Completed", progress: 100 },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Completed":
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case "In Progress":
      return <Clock className="w-5 h-5 text-yellow-500" />;
    default:
      return <Clock className="w-5 h-5 text-blue-500" />;
  }
};

const Tasks = () => {
  const { tasks, addTask, deleteTask } = useTasks();

  return (
    <Layout>
      <div className="space-y-4 animate-fade-in pb-20 md:pb-0">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Tasks</h1>
        </div>

        <div className="flex justify-end">
          <CreateTaskDialog onTaskCreate={addTask} />
        </div>

        <div className="grid gap-4">
          {tasks.map((task, index) => (
            <Card
              key={task.id}
              className="p-4 bg-gradient-to-br from-background to-card border-none shadow-lg fire-glow-hover transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(task.status)}
                  <div>
                    <h3 className="text-base font-medium">{task.title}</h3>
                    <span className="text-sm text-gray-500">{task.status}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24">
                    <div className="h-1.5 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                  <DeleteTaskDialog onDelete={() => deleteTask(task.id)} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Tasks;
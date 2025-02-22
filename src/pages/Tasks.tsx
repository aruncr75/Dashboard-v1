import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, CheckCircle2, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { CreateTaskDialog } from "@/components/tasks/CreateTaskDialog";
import { DeleteTaskDialog } from "@/components/tasks/DeleteTaskDialog";
import { useTasksStore } from "@/store/tasksStore";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

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

const statuses = ["Completed", "In Progress", "Pending"];

const Tasks = () => {
  const { tasks, addTask, deleteTask, updateTaskStatus } = useTasksStore();

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
                <div className="flex flex-col">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(task.status)}
                    <div>
                      <h3 className="text-base font-medium">{task.title}</h3>
                    </div>
                  </div>
                  {/* Re-introduced dropdown for task status */}
                  <div className="mt-2 w-[150px]">
                    <Select
                      value={task.status}
                      onValueChange={(newStatus) => updateTaskStatus(task.id, newStatus)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
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
              {/* Render quick buttons for statuses other than current task status */}
              <div className="flex space-x-2 mt-2">
                {statuses
                  .filter((s) => s !== task.status)
                  .map((s) => (
                    <Button
                      key={s}
                      variant="outline"
                      size="sm"
                      onClick={() => updateTaskStatus(task.id, s)}
                    >
                      <span
                        className={
                          s === "Completed"
                            ? "text-green-500"
                            : s === "In Progress"
                            ? "text-yellow-500"
                            : "text-blue-500"
                        }
                      >
                        {s}
                      </span>
                    </Button>
                  ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Tasks;
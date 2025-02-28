import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, CheckCircle2, Clock, Trash2 } from "lucide-react";
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
import ProgressBar from "@/components/ui/ProgressBar";
import EditTaskDialog from "@/components/tasks/EditTaskDialog"; // added import

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

const orderMap = {
  "In Progress": 0,
  Pending: 1,
  Completed: 2,
};

const Tasks = () => {
  const { tasks, addTask, deleteTask, updateTaskStatus, editTask } =
    useTasksStore();
  // Sort tasks with "In Progress" on top, then "Pending", then "Completed"
  const sortedTasks = [...tasks].sort(
    (a, b) => orderMap[a.status] - orderMap[b.status]
  );

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
          {sortedTasks.map((task, index) => (
            <Card
              key={task.id}
              className="p-4 bg-gradient-to-br from-background to-card border-none shadow-lg fire-glow-hover"
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
                      onValueChange={(newStatus) =>
                        updateTaskStatus(task.id, newStatus)
                      }
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
                    {/* ProgressBar color now reflects task icon colors */}
                    <ProgressBar
                      progress={task.progress}
                      status={
                        task.status as "Completed" | "In Progress" | "Pending"
                      }
                    />
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
                {/* Quick delete button modified to use text instead of icon */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteTask(task.id)}
                >
                  <span className="text-red-500">Delete</span>
                </Button>
                {/* Quick edit button using EditTaskDialog with status */}
                <EditTaskDialog
                  taskTitle={task.title}
                  taskStatus={task.status}
                  onEdit={(newTitle, newStatus) =>
                    editTask(task.id, newTitle, newStatus)
                  }
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Tasks;

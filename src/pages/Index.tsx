import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Clock, ListTodo } from "lucide-react";
import { Link } from "react-router-dom";
import { useTasksStore } from "@/store/tasksStore";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const Dashboard = () => {
  // updated to include quick update function
  const { tasks, updateTaskStatus } = useTasksStore();
  const totalTasks = tasks.length;
  const completed = tasks.filter(t => t.status === "Completed").length;
  const inProgress = tasks.filter(t => t.status === "In Progress").length;
  const pending = tasks.filter(t => t.status === "Pending").length;

  const taskStats = [
    { title: "Total Tasks", count: totalTasks, icon: ListTodo, color: "from-cyan-500 to-blue-500" },
    { title: "Completed", count: completed, icon: CheckCircle2, color: "from-green-400 to-cyan-500" },
    { title: "In Progress", count: inProgress, icon: Clock, color: "from-blue-500 to-cyan-400" },
    { title: "Pending", count: pending, icon: Clock, color: "from-cyan-400 to-blue-500" },
  ];

  // Show the last three tasks as recent tasks, sorted by most recent first
  const recentTasks = [...tasks]
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);

  // Generate weekly data based on current tasks
  const data = [
    { name: "Mon", completed, inProgress, pending },
    { name: "Tue", completed, inProgress, pending },
    { name: "Wed", completed, inProgress, pending },
    { name: "Thu", completed, inProgress, pending },
    { name: "Fri", completed, inProgress, pending },
    { name: "Sat", completed, inProgress, pending },
    { name: "Sun", completed, inProgress, pending },
  ];

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Dashboard
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {taskStats.map((stat) => (
            <Card 
              key={stat.title} 
              className="p-4 animate-fade-in bg-gradient-to-br from-background to-card border-none shadow-lg shadow-cyan-500/20 fire-glow-hover transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color} bg-opacity-10`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.count}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 animate-fade-in [animation-delay:200ms] bg-gradient-to-br from-background to-card border-none shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-white">Recent Tasks</h2>
            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div key={task.id} className="bg-black/20 rounded-lg p-3 animate-fade-in hover:bg-black/30 transition-colors duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {task.status === "Completed" ? (
                        <CheckCircle2 className="w-5 h-5 text-cyan-500" />
                      ) : task.status === "In Progress" ? (
                        <Clock className="w-5 h-5 text-blue-400" />
                      ) : (
                        <ListTodo className="w-5 h-5 text-yellow-400" />
                      )}
                      <span className="text-gray-300">{task.title}</span>
                    </div>
                  </div>
                  {/* Quick status change buttons with highlight for current status */}
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={() => updateTaskStatus(task.id, "Completed")}
                      className={`px-2 py-1 text-xs rounded bg-green-600 hover:bg-green-700 text-white ${task.status === "Completed" ? "ring-2 ring-green-300" : ""}`}
                    >
                      Completed
                    </button>
                    <button
                      onClick={() => updateTaskStatus(task.id, "In Progress")}
                      className={`px-2 py-1 text-xs rounded bg-blue-600 hover:bg-blue-700 text-white ${task.status === "In Progress" ? "ring-2 ring-blue-300" : ""}`}
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => updateTaskStatus(task.id, "Pending")}
                      className={`px-2 py-1 text-xs rounded bg-yellow-600 hover:bg-yellow-700 text-white ${task.status === "Pending" ? "ring-2 ring-yellow-300" : ""}`}
                    >
                      Pending
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/tasks"
              className="flex items-center space-x-2 mt-4 text-cyan-400 hover:text-cyan-300"
            >
              <span>View all tasks</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Card>

          <Card className="p-6 animate-fade-in [animation-delay:400ms] bg-gradient-to-br from-background to-card border-none shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-white">Weekly Overview</h2>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorInProgress" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid #333',
                      borderRadius: '8px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="completed"
                    stroke="#06b6d4"
                    fillOpacity={1}
                    fill="url(#colorCompleted)"
                    stackId="1"
                    name="Completed"
                  />
                  <Area
                    type="monotone"
                    dataKey="inProgress"
                    stroke="#0ea5e9"
                    fillOpacity={1}
                    fill="url(#colorInProgress)"
                    stackId="1"
                    name="In Progress"
                  />
                  <Area
                    type="monotone"
                    dataKey="pending"
                    stroke="#38bdf8"
                    fillOpacity={1}
                    fill="url(#colorPending)"
                    stackId="1"
                    name="Pending"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <Link
              to="/analytics"
              className="flex items-center space-x-2 mt-4 text-cyan-400 hover:text-cyan-300"
            >
              <span>View detailed analytics</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
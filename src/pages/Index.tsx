import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Clock, ListTodo } from "lucide-react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const data = [
  { name: "Mon", tasks: 4 },
  { name: "Tue", tasks: 3 },
  { name: "Wed", tasks: 5 },
  { name: "Thu", tasks: 2 },
  { name: "Fri", tasks: 6 },
  { name: "Sat", tasks: 4 },
  { name: "Sun", tasks: 3 },
];

const recentTasks = [
  { id: 1, title: "Update documentation", completed: true },
  { id: 2, title: "Review pull requests", completed: false },
  { id: 3, title: "Prepare presentation", completed: false },
];

const taskStats = [
  { title: "Total Tasks", count: 12, icon: ListTodo, color: "from-cyan-500 to-blue-500" },
  { title: "Completed", count: 5, icon: CheckCircle2, color: "from-green-400 to-cyan-500" },
  { title: "In Progress", count: 4, icon: Clock, color: "from-blue-500 to-cyan-400" },
  { title: "Pending", count: 3, icon: Clock, color: "from-cyan-400 to-blue-500" },
];

const Dashboard = () => {
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
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 bg-black/20 rounded-lg animate-fade-in hover:bg-black/30 transition-colors duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <CheckCircle2
                      className={`w-5 h-5 ${
                        task.completed ? "text-cyan-500" : "text-gray-600"
                      }`}
                    />
                    <span className="text-gray-300">{task.title}</span>
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
                    <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
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
                    dataKey="tasks"
                    stroke="#06b6d4"
                    fillOpacity={1}
                    fill="url(#colorTasks)"
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
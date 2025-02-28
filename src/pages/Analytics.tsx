import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { useTasksStore } from "@/store/tasksStore";

const Analytics = () => {
  const { tasks } = useTasksStore();
  const completed = tasks.filter(t => t.status === "Completed").length;
  const inProgress = tasks.filter(t => t.status === "In Progress").length;
  const pending = tasks.filter(t => t.status === "Pending").length;
  const total = tasks.length;

  // Calculate percentages
  const completedPercentage = ((completed / total) * 100).toFixed(1);
  const inProgressPercentage = ((inProgress / total) * 100).toFixed(1);
  const pendingPercentage = ((pending / total) * 100).toFixed(1);

  // Calculate average progress
  const averageProgress = tasks.length > 0 
    ? (tasks.reduce((acc, task) => acc + task.progress, 0) / tasks.length).toFixed(1)
    : 0;

  // Prepare data for charts
  const pieData = [
    { name: "Completed", value: completed },
    { name: "In Progress", value: inProgress },
    { name: "Pending", value: pending }
  ];

  const barData = [
    { status: 'Completed', tasks: completed },
    { status: 'In Progress', tasks: inProgress },
    { status: 'Pending', tasks: pending }
  ];

  const COLORS = ["#22c55e", "#eab308", "#3b82f6"]; // green, yellow, blue for Completed, In Progress, Pending

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in pb-20 md:pb-0">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-gradient-to-br from-green-500/10 to-green-500/5 border-none">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-400">Completed Tasks</p>
                <h3 className="text-2xl font-bold">{completed}</h3>
                <p className="text-sm text-green-500">{completedPercentage}%</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-none">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-400">In Progress</p>
                <h3 className="text-2xl font-bold">{inProgress}</h3>
                <p className="text-sm text-yellow-500">{inProgressPercentage}%</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-none">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-400">Pending Tasks</p>
                <h3 className="text-2xl font-bold">{pending}</h3>
                <p className="text-sm text-blue-500">{pendingPercentage}%</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-none">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                <span className="text-purple-500 font-bold">{averageProgress}%</span>
              </div>
              <div>
                <p className="text-sm text-gray-400">Average Progress</p>
                <h3 className="text-2xl font-bold">{total}</h3>
                <p className="text-sm text-purple-500">Total Tasks</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart Card */}
          <Card className="p-6 bg-gradient-to-br from-background to-card border-none shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Tasks Distribution</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="status" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid #333',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="tasks" fill="#3b82f6" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Pie Chart Card */}
          <Card className="p-6 bg-gradient-to-br from-background to-card border-none shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Status Overview</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData.filter(d => d.value > 0)}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={8}
                    dataKey="value"
                    label={({ name, value, percent }) => 
                      value > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : ''
                    }
                    labelLine={false}
                    animationBegin={0}
                    animationDuration={1500}
                  >
                    {pieData.filter(d => d.value > 0).map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index]}
                        strokeWidth={2}
                        stroke={COLORS[index]}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid #333',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value, name) => [`${value} tasks`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
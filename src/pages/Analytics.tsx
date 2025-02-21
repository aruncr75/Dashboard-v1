import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { useTasksStore } from "@/store/tasksStore";

const Analytics = () => {
  const { tasks } = useTasksStore();
  const completed = tasks.filter(t => t.status === "Completed").length;
  const inProgress = tasks.filter(t => t.status === "In Progress").length;
  const pending = tasks.filter(t => t.status === "Pending").length;

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

  const COLORS = ["#06b6d4", "#0ea5e9", "#38bdf8"];

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in pb-20 md:pb-0">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Analytics</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart Card */}
          <Card className="p-6 animate-fade-in [animation-delay:200ms] bg-gradient-to-br from-background to-card border-none shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-white">Tasks Status Distribution - Bar Chart</h2>
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
                  <Bar dataKey="tasks" fill="#06b6d4" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Pie Chart Card */}
          <Card className="p-6 animate-fade-in [animation-delay:400ms] bg-gradient-to-br from-background to-card border-none shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-white">Tasks Status Overview - Pie Chart</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid #333',
                      borderRadius: '8px'
                    }}
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
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

const lineData = [
  { date: "Mon", completed: 5 },
  { date: "Tue", completed: 8 },
  { date: "Wed", completed: 3 },
  { date: "Thu", completed: 7 },
  { date: "Fri", completed: 4 },
  { date: "Sat", completed: 6 },
  { date: "Sun", completed: 5 },
];

const barData = [
  { day: "Mon", tasks: 3, inProgress: 2 },
  { day: "Tue", tasks: 5, inProgress: 3 },
  { day: "Wed", tasks: 2, inProgress: 1 },
  { day: "Thu", tasks: 7, inProgress: 4 },
  { day: "Fri", tasks: 4, inProgress: 2 },
  { day: "Sat", tasks: 3, inProgress: 1 },
  { day: "Sun", tasks: 6, inProgress: 3 },
];

const pieData = [
  { name: "Completed", value: 12 },
  { name: "In Progress", value: 8 },
  { name: "Todo", value: 5 },
];

// Using a consistent cyan/blue color scheme
const COLORS = ["#06b6d4", "#0ea5e9", "#38bdf8"];

const Analytics = () => {
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
          <Card className="p-6 animate-fade-in [animation-delay:200ms] bg-gradient-to-br from-background to-card border-none shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-white">Task Completion Trend</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={lineData}>
                  <defs>
                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" stroke="#666" />
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
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6 animate-fade-in [animation-delay:400ms] bg-gradient-to-br from-background to-card border-none shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-white">Daily Task Distribution</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="day" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid #333',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="tasks" fill="#06b6d4" name="Total Tasks" />
                  <Bar dataKey="inProgress" fill="#0ea5e9" name="In Progress" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6 lg:col-span-2 animate-fade-in [animation-delay:600ms] bg-gradient-to-br from-background to-card border-none shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-white">Task Status Overview</h2>
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
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
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
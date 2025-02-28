import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ElegantContainer } from "@/components/ui/ElegantContainer";
import { useTasksStore } from "@/store/tasksStore";

const Test = () => {
  const { tasks } = useTasksStore();
  
  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "Completed").length;
  const inProgressTasks = tasks.filter(t => t.status === "In Progress").length;
  const pendingTasks = tasks.filter(t => t.status === "Pending").length;
  const completionRate = totalTasks ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0;
  const progressRate = totalTasks ? ((inProgressTasks / totalTasks) * 100).toFixed(1) : 0;
  const pendingRate = totalTasks ? ((pendingTasks / totalTasks) * 100).toFixed(1) : 0;

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in pb-20 md:pb-0">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Test Page</h1>
        </div>

        <div className="w-full max-w-3xl mx-auto">
          <div className="w-full">
            <ElegantContainer>
              <div className="text-center space-y-6 p-4">
                <h2 className="text-2xl font-semibold mb-6">Task Overview</h2>
                <div className="space-y-6 max-w-md mx-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <span className="text-gray-400 text-sm">Total Tasks</span>
                      <div className="text-2xl font-medium text-primary mt-1">{totalTasks}</div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <span className="text-gray-400 text-sm">Completed</span>
                      <div className="text-2xl font-medium text-green-500 mt-1">{completedTasks}</div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <span className="text-gray-400 text-sm">In Progress</span>
                      <div className="text-2xl font-medium text-yellow-500 mt-1">{inProgressTasks}</div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <span className="text-gray-400 text-sm">Pending</span>
                      <div className="text-2xl font-medium text-blue-500 mt-1">{pendingTasks}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t border-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Completion Rate:</span>
                      <span className="text-xl text-primary font-medium">{completionRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Progress Rate:</span>
                      <span className="text-xl text-yellow-500 font-medium">{progressRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Pending Rate:</span>
                      <span className="text-xl text-blue-500 font-medium">{pendingRate}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </ElegantContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Test;

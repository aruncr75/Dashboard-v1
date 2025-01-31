import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Timer } from "lucide-react";
import { cn } from "@/lib/utils";

export function CountdownTimer() {
  const [count, setCount] = useState(10);
  const [isActive, setIsActive] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && count > 0) {
      interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 200); // Reset animation

        setCount((prev) => {
          if (prev === 1) {
            setIsActive(false);
            return 10; // Reset to 10 when reaching 1
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, count]);

  const handleRestart = () => {
    setCount(10);
    setIsActive(true);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-background to-card border-none shadow-lg animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500">
            <Timer className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Countdown Timer</h3>
            <p className="text-gray-400">Auto-restarts at 1</p>
          </div>
        </div>
        <div className={cn(
          "text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent transition-transform duration-200",
          isAnimating && "scale-150"
        )}>
          {count}
        </div>
      </div>
      <button
        onClick={handleRestart}
        className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:opacity-90 transition-opacity"
      >
        Restart Timer
      </button>
    </Card>
  );
}

import React from "react";

type ProgressBarProps = {
  progress: number; // percentage (0-100)
  status: "Pending" | "In Progress" | "Completed";
};

const statusColors: Record<ProgressBarProps["status"], string> = {
  Pending: "bg-blue-500",
  "In Progress": "bg-yellow-500",
  Completed: "bg-green-500",
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  status,
}) => {
  const colorClass = statusColors[status] || "bg-gray-500";

  return (
    <div className="w-full rounded-full h-4 overflow-hidden bg-white/5 border border-white/20 backdrop-blur-lg shadow-md">
      <div
        className={`${colorClass} relative h-full shadow-inner transition-all duration-500`}
        style={{ width: `${progress}%` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/10 to-transparent opacity-30 pointer-events-none" />
      </div>
    </div>
  );
};

export default ProgressBar;

import React from "react";

type ProgressBarProps = {
  progress: number;
  status: "Pending" | "In Progress" | "Completed";
  showGlowEffect?: boolean;
};

const statusStyles = {
  Pending: {
    bg: "bg-gradient-to-r from-blue-500 to-cyan-400",
    glow: "shadow-blue-500/50"
  },
  "In Progress": {
    bg: "bg-gradient-to-r from-yellow-500 to-orange-400",
    glow: "shadow-yellow-500/50"
  },
  Completed: {
    bg: "bg-gradient-to-r from-green-500 to-emerald-400",
    glow: "shadow-green-500/50"
  }
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  status,
  showGlowEffect = true
}) => {
  const style = statusStyles[status];

  return (
    <div className="relative w-full h-4 bg-gray-900/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
      <div
        className={`h-full transition-all duration-500 ease-out ${style.bg} ${
          showGlowEffect ? `shadow-lg ${style.glow}` : ""
        }`}
        style={{ width: `${progress}%` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />
      </div>
    </div>
  );
};

export default ProgressBar;

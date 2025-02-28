import React from 'react';

interface ElegantContainerProps {
  children: React.ReactNode;
}

export const ElegantContainer: React.FC<ElegantContainerProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-full min-h-[400px] md:min-h-[450px] bg-[#1a1a24] rounded-2xl flex justify-center items-center text-[#f0f0f0] font-light tracking-wider shadow-xl overflow-hidden p-6">
        <div className="border-glow absolute inset-0 rounded-2xl pointer-events-none">
          <style>
            {`
              @keyframes rotateGlow {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              
              @keyframes pulse {
                0%, 100% {
                  opacity: 0.3;
                  transform: scale(0.8);
                }
                50% {
                  opacity: 0.7;
                  transform: scale(1.1);
                }
              }
              
              .border-glow::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: conic-gradient(
                  transparent 0%,
                  rgba(255, 255, 255, 0) 30%, 
                  rgba(72, 118, 255, 0.2) 40%,
                  rgba(132, 206, 255, 0.8) 50%,
                  rgba(72, 118, 255, 0.2) 60%,
                  rgba(255, 255, 255, 0) 70%,
                  transparent 100%
                );
                animation: rotateGlow 12s linear infinite;
                opacity: 0.7;
              }
              
              .border-glow::after {
                content: '';
                position: absolute;
                top: 2px;
                left: 2px;
                right: 2px;
                bottom: 2px;
                background-color: #1a1a24;
                border-radius: 14px;
                box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.6);
              }
            `}
          </style>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.05)_0%,transparent_60%)] z-[1]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(100,149,237,0.05)_0%,transparent_70%)] z-[1] animate-pulse"></div>
        <div className="relative z-[2] opacity-0 animate-[fadeIn_2s_ease_forwards_0.5s] w-full max-w-[500px] mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

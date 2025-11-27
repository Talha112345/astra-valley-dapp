import { useEffect, useState } from 'react';
import { TrendingUp, Award } from 'lucide-react';

interface LevelUpNotificationProps {
  show: boolean;
  newRank: string;
  onComplete: () => void;
}

const LevelUpNotification = ({ show, newRank, onComplete }: LevelUpNotificationProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onComplete, 500);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="relative animate-scale-in">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 blur-3xl opacity-50 animate-pulse"></div>
        
        {/* Main card */}
        <div className="relative glass-card border-4 border-yellow-500/50 p-8 text-center space-y-4 cosmic-glow">
          <div className="relative">
            <TrendingUp className="w-20 h-20 mx-auto text-yellow-400 animate-pulse-glow" />
            <Award className="w-10 h-10 absolute -top-2 -right-2 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-4xl font-orbitron font-black gradient-text animate-fade-in">
              LEVEL UP!
            </h2>
            <p className="text-2xl font-orbitron font-bold text-yellow-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              New Rank: {newRank}
            </p>
            <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: '0.4s' }}>
              You've reached a new milestone!
            </p>
          </div>
          
          {/* Particle effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelUpNotification;

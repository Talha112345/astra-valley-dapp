import { User, Coins, Rocket, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface UserProfileProps {
  address: string | null;
  planet: string;
  rank: string;
  balance: string;
  staked: string;
  rewards: string;
}

const UserProfile = ({ address, planet, rank, balance, staked, rewards }: UserProfileProps) => {
  const formatAddress = (addr: string | null) => {
    if (!addr) return 'Not Connected';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <Card className="glass-card p-6 border-2 border-primary/20">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-orbitron font-bold gradient-text">Cosmic Traveler</h2>
          <p className="text-muted-foreground font-mono text-sm">{formatAddress(address)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="glass-card p-4 text-center">
          <Rocket className="w-6 h-6 mx-auto mb-2 text-secondary" />
          <p className="text-xs text-muted-foreground mb-1">Current Planet</p>
          <p className="font-orbitron font-bold text-foreground">{planet}</p>
        </div>

        <div className="glass-card p-4 text-center">
          <Award className="w-6 h-6 mx-auto mb-2 text-accent" />
          <p className="text-xs text-muted-foreground mb-1">Rank</p>
          <p className="font-orbitron font-bold text-foreground">{rank}</p>
        </div>

        <div className="glass-card p-4 text-center">
          <Coins className="w-6 h-6 mx-auto mb-2 text-primary" />
          <p className="text-xs text-muted-foreground mb-1">Balance</p>
          <p className="font-orbitron font-bold text-foreground">{balance} ASTRA</p>
        </div>

        <div className="glass-card p-4 text-center">
          <div className="w-6 h-6 mx-auto mb-2 rounded-full bg-secondary/20 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-secondary"></div>
          </div>
          <p className="text-xs text-muted-foreground mb-1">Staked</p>
          <p className="font-orbitron font-bold text-foreground">{staked} ASTRA</p>
        </div>

        <div className="glass-card p-4 text-center col-span-2 md:col-span-1">
          <div className="w-6 h-6 mx-auto mb-2 rounded-full bg-accent/20 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-accent animate-pulse-glow"></div>
          </div>
          <p className="text-xs text-muted-foreground mb-1">Pending Rewards</p>
          <p className="font-orbitron font-bold text-foreground">{rewards} ASTRA</p>
        </div>
      </div>
    </Card>
  );
};

export default UserProfile;

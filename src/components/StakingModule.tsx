import { useState } from 'react';
import { TrendingUp, Gift, Unlock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface StakingModuleProps {
  stakedAmount: string;
  pendingRewards: string;
  onStake: (amount: string) => Promise<void>;
  onClaim: () => Promise<void>;
  onUnstake: () => Promise<void>;
}

const StakingModule = ({ stakedAmount, pendingRewards, onStake, onClaim, onUnstake }: StakingModuleProps) => {
  const [stakeAmount, setStakeAmount] = useState('');
  const [loading, setLoading] = useState<string | null>(null);

  const handleStake = async () => {
    if (!stakeAmount) return;
    setLoading('stake');
    try {
      await onStake(stakeAmount);
      setStakeAmount('');
    } finally {
      setLoading(null);
    }
  };

  const handleClaim = async () => {
    setLoading('claim');
    try {
      await onClaim();
    } finally {
      setLoading(null);
    }
  };

  const handleUnstake = async () => {
    setLoading('unstake');
    try {
      await onUnstake();
    } finally {
      setLoading(null);
    }
  };

  return (
    <Card className="glass-card p-6 border-2 border-accent/20">
      <h3 className="text-xl font-orbitron font-bold mb-6 gradient-text">Staking Module</h3>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="glass-card p-4 text-center">
          <TrendingUp className="w-8 h-8 mx-auto mb-2 text-secondary" />
          <p className="text-xs text-muted-foreground mb-1">Currently Staked</p>
          <p className="text-2xl font-orbitron font-bold text-foreground">{stakedAmount}</p>
          <p className="text-xs text-muted-foreground">ASTRA</p>
        </div>

        <div className="glass-card p-4 text-center">
          <Gift className="w-8 h-8 mx-auto mb-2 text-accent animate-pulse-glow" />
          <p className="text-xs text-muted-foreground mb-1">Pending Rewards</p>
          <p className="text-2xl font-orbitron font-bold text-foreground">{pendingRewards}</p>
          <p className="text-xs text-muted-foreground">ASTRA (1% per day)</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Stake */}
        <div className="glass-card p-4">
          <Label htmlFor="stakeAmount" className="text-foreground mb-2">
            Stake ASTRA Tokens
          </Label>
          <div className="flex gap-2 mt-2">
            <Input
              id="stakeAmount"
              type="number"
              placeholder="Amount to stake"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              className="bg-background/50 border-border"
            />
            <Button
              onClick={handleStake}
              disabled={loading === 'stake' || !stakeAmount}
              className="bg-accent hover:bg-accent/80 font-orbitron"
            >
              {loading === 'stake' ? 'Staking...' : 'Stake'}
            </Button>
          </div>
        </div>

        {/* Claim & Unstake */}
        <div className="grid md:grid-cols-2 gap-4">
          <Button
            onClick={handleClaim}
            disabled={loading === 'claim' || parseFloat(pendingRewards) === 0}
            className="bg-gradient-to-r from-primary to-accent font-orbitron font-bold h-12"
          >
            <Gift className="mr-2 h-4 w-4" />
            {loading === 'claim' ? 'Claiming...' : 'Claim Rewards'}
          </Button>

          <Button
            onClick={handleUnstake}
            disabled={loading === 'unstake' || parseFloat(stakedAmount) === 0}
            variant="outline"
            className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-orbitron font-bold h-12"
          >
            <Unlock className="mr-2 h-4 w-4" />
            {loading === 'unstake' ? 'Unstaking...' : 'Unstake All'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default StakingModule;

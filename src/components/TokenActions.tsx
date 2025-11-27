import { useState } from 'react';
import { ShoppingCart, Send, Flame } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TokenActionsProps {
  onBuy: (amount: string) => Promise<void>;
  onTransfer: (to: string, amount: string) => Promise<void>;
  onBurn: (amount: string) => Promise<void>;
}

const TokenActions = ({ onBuy, onTransfer, onBurn }: TokenActionsProps) => {
  const [buyAmount, setBuyAmount] = useState('');
  const [transferTo, setTransferTo] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [burnAmount, setBurnAmount] = useState('');
  const [loading, setLoading] = useState<string | null>(null);

  const handleBuy = async () => {
    if (!buyAmount) return;
    setLoading('buy');
    try {
      await onBuy(buyAmount);
      setBuyAmount('');
    } finally {
      setLoading(null);
    }
  };

  const handleTransfer = async () => {
    if (!transferTo || !transferAmount) return;
    setLoading('transfer');
    try {
      await onTransfer(transferTo, transferAmount);
      setTransferTo('');
      setTransferAmount('');
    } finally {
      setLoading(null);
    }
  };

  const handleBurn = async () => {
    if (!burnAmount) return;
    setLoading('burn');
    try {
      await onBurn(burnAmount);
      setBurnAmount('');
    } finally {
      setLoading(null);
    }
  };

  return (
    <Card className="glass-card p-6 border-2 border-primary/20">
      <h3 className="text-xl font-orbitron font-bold mb-6 gradient-text">ASTRA Token Actions</h3>

      <div className="space-y-6">
        {/* Buy Tokens */}
        <div className="glass-card p-4">
          <Label htmlFor="buyAmount" className="text-foreground mb-2 flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-primary" />
            Buy ASTRA Tokens
          </Label>
          <div className="flex gap-2 mt-2">
            <Input
              id="buyAmount"
              type="number"
              placeholder="Amount (e.g., 100)"
              value={buyAmount}
              onChange={(e) => setBuyAmount(e.target.value)}
              className="bg-background/50 border-border"
            />
            <Button
              onClick={handleBuy}
              disabled={loading === 'buy' || !buyAmount}
              className="bg-primary hover:bg-primary/80 font-orbitron"
            >
              {loading === 'buy' ? 'Buying...' : 'Buy'}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Price: 0.001 ETH per token</p>
        </div>

        {/* Transfer Tokens */}
        <div className="glass-card p-4">
          <Label className="text-foreground mb-2 flex items-center gap-2">
            <Send className="w-4 h-4 text-secondary" />
            Transfer ASTRA
          </Label>
          <div className="space-y-2 mt-2">
            <Input
              type="text"
              placeholder="Recipient Address (0x...)"
              value={transferTo}
              onChange={(e) => setTransferTo(e.target.value)}
              className="bg-background/50 border-border"
            />
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Amount"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                className="bg-background/50 border-border"
              />
              <Button
                onClick={handleTransfer}
                disabled={loading === 'transfer' || !transferTo || !transferAmount}
                className="bg-secondary hover:bg-secondary/80 font-orbitron"
              >
                {loading === 'transfer' ? 'Sending...' : 'Send'}
              </Button>
            </div>
          </div>
        </div>

        {/* Burn Tokens */}
        <div className="glass-card p-4">
          <Label htmlFor="burnAmount" className="text-foreground mb-2 flex items-center gap-2">
            <Flame className="w-4 h-4 text-destructive" />
            Burn ASTRA
          </Label>
          <div className="flex gap-2 mt-2">
            <Input
              id="burnAmount"
              type="number"
              placeholder="Amount to burn"
              value={burnAmount}
              onChange={(e) => setBurnAmount(e.target.value)}
              className="bg-background/50 border-border"
            />
            <Button
              onClick={handleBurn}
              disabled={loading === 'burn' || !burnAmount}
              variant="destructive"
              className="font-orbitron"
            >
              {loading === 'burn' ? 'Burning...' : 'Burn'}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Permanently remove tokens from circulation</p>
        </div>
      </div>
    </Card>
  );
};

export default TokenActions;

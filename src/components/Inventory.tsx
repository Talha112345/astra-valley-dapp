import { useState } from 'react';
import { Package, Sparkles, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface InventoryItem {
  id: string;
  name: string;
  emoji: string;
  effect: string;
  used: boolean;
}

interface InventoryProps {
  items: InventoryItem[];
  onUseItem: (itemId: string) => void;
}

const Inventory = ({ items, onUseItem }: InventoryProps) => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleUse = async (itemId: string) => {
    setLoading(itemId);
    try {
      await onUseItem(itemId);
    } finally {
      setLoading(null);
    }
  };

  return (
    <Card className="glass-card p-6 border-2 border-accent/20">
      <h3 className="text-xl font-orbitron font-bold mb-6 gradient-text flex items-center gap-2">
        <Package className="w-6 h-6" />
        Inventory
      </h3>

      {items.length === 0 ? (
        <div className="text-center py-8">
          <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No items yet. Purchase from the marketplace!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {items.map((item) => (
            <div key={item.id} className={`glass-card p-3 text-center ${item.used ? 'opacity-50' : ''}`}>
              <div className="text-4xl mb-2">{item.emoji}</div>
              <p className="text-xs font-orbitron font-bold text-foreground mb-1">{item.name}</p>
              <p className="text-xs text-muted-foreground mb-2">{item.effect}</p>
              <Button
                size="sm"
                onClick={() => handleUse(item.id)}
                disabled={loading === item.id || item.used}
                className="w-full bg-accent hover:bg-accent/80 text-xs"
              >
                {item.used ? 'Used' : loading === item.id ? 'Using...' : 'Use'}
              </Button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default Inventory;

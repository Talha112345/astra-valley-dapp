import { useState } from 'react';
import { ShoppingBag, Tag } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MarketplaceProps {
  onBuyItem: (itemId: string, price: string) => Promise<void>;
  onSellItem: (itemName: string, price: string) => Promise<void>;
}

const MOCK_ITEMS = [
  { id: '1', name: 'Cosmic Sword', price: '50', emoji: '⚔️' },
  { id: '2', name: 'Star Shield', price: '75', emoji: '🛡️' },
  { id: '3', name: 'Nebula Armor', price: '100', emoji: '🦾' },
  { id: '4', name: 'Quantum Wings', price: '150', emoji: '🪽' },
];

const Marketplace = ({ onBuyItem, onSellItem }: MarketplaceProps) => {
  const [sellName, setSellName] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [loading, setLoading] = useState<string | null>(null);

  const handleBuy = async (itemId: string, price: string) => {
    setLoading(itemId);
    try {
      await onBuyItem(itemId, price);
    } finally {
      setLoading(null);
    }
  };

  const handleSell = async () => {
    if (!sellName || !sellPrice) return;
    setLoading('sell');
    try {
      await onSellItem(sellName, sellPrice);
      setSellName('');
      setSellPrice('');
    } finally {
      setLoading(null);
    }
  };

  return (
    <Card className="glass-card p-6 border-2 border-primary/20">
      <h3 className="text-xl font-orbitron font-bold mb-6 gradient-text flex items-center gap-2">
        <ShoppingBag className="w-6 h-6" />
        Cosmic Marketplace
      </h3>

      {/* Buy Items */}
      <div className="mb-6">
        <h4 className="text-sm font-orbitron font-bold text-foreground mb-3">Available Items</h4>
        <div className="grid grid-cols-2 gap-3">
          {MOCK_ITEMS.map((item) => (
            <div key={item.id} className="glass-card p-3 text-center">
              <div className="text-4xl mb-2">{item.emoji}</div>
              <p className="text-xs font-orbitron font-bold text-foreground mb-1">{item.name}</p>
              <p className="text-xs text-primary mb-2">{item.price} ASTRA</p>
              <Button
                size="sm"
                onClick={() => handleBuy(item.id, item.price)}
                disabled={loading === item.id}
                className="w-full bg-primary hover:bg-primary/80 text-xs"
              >
                {loading === item.id ? 'Buying...' : 'Buy'}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Sell Items */}
      <div className="glass-card p-4">
        <h4 className="text-sm font-orbitron font-bold text-foreground mb-3 flex items-center gap-2">
          <Tag className="w-4 h-4 text-accent" />
          List Item for Sale
        </h4>
        <div className="space-y-2">
          <Input
            placeholder="Item Name"
            value={sellName}
            onChange={(e) => setSellName(e.target.value)}
            className="bg-background/50 border-border text-sm"
          />
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Price (ASTRA)"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
              className="bg-background/50 border-border text-sm"
            />
            <Button
              onClick={handleSell}
              disabled={loading === 'sell' || !sellName || !sellPrice}
              className="bg-accent hover:bg-accent/80 text-sm"
            >
              {loading === 'sell' ? 'Listing...' : 'List'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Marketplace;

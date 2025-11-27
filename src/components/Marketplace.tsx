import { useState } from 'react';
import { ShoppingBag, Tag } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MarketplaceProps {
  onBuyItem: (itemId: string, name: string, emoji: string, price: string, effect: string) => Promise<void>;
  onSellItem: (itemName: string, price: string, category: string, description: string) => Promise<void>;
  existingItems: string[];
}

const MOCK_ITEMS = [
  { id: '1', name: 'Cosmic Sword', price: '50', emoji: '⚔️', effect: '+10% Staking Rewards' },
  { id: '2', name: 'Star Shield', price: '75', emoji: '🛡️', effect: '+15% Reward Boost' },
  { id: '3', name: 'Nebula Armor', price: '100', emoji: '🦾', effect: '+20% Staking Multiplier' },
  { id: '4', name: 'Quantum Wings', price: '150', emoji: '🪽', effect: 'Golden Avatar Glow' },
];

const Marketplace = ({ onBuyItem, onSellItem, existingItems }: MarketplaceProps) => {
  const [sellName, setSellName] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [sellCategory, setSellCategory] = useState('');
  const [sellDescription, setSellDescription] = useState('');
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleBuy = async (item: typeof MOCK_ITEMS[0]) => {
    setLoading(item.id);
    try {
      await onBuyItem(item.id, item.name, item.emoji, item.price, item.effect);
    } finally {
      setLoading(null);
    }
  };

  const handleSell = async () => {
    setError('');
    
    // Validation
    if (!sellName.trim()) {
      setError('Item name is required');
      return;
    }
    if (!sellPrice || parseFloat(sellPrice) <= 0) {
      setError('Price must be greater than 0');
      return;
    }
    if (existingItems.includes(sellName.toLowerCase())) {
      setError('An item with this name already exists');
      return;
    }
    if (!sellCategory.trim()) {
      setError('Category is required');
      return;
    }
    if (!sellDescription.trim()) {
      setError('Description is required');
      return;
    }

    setLoading('sell');
    try {
      await onSellItem(sellName, sellPrice, sellCategory, sellDescription);
      setSellName('');
      setSellPrice('');
      setSellCategory('');
      setSellDescription('');
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
              <p className="text-xs text-primary mb-1">{item.price} ASTRA</p>
              <p className="text-xs text-muted-foreground mb-2">{item.effect}</p>
              <Button
                size="sm"
                onClick={() => handleBuy(item)}
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
          {error && (
            <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded px-2 py-1">
              {error}
            </div>
          )}
          <Input
            placeholder="Item Name"
            value={sellName}
            onChange={(e) => setSellName(e.target.value)}
            className="bg-background/50 border-border text-sm"
          />
          <Input
            placeholder="Category (e.g., Weapon, Armor)"
            value={sellCategory}
            onChange={(e) => setSellCategory(e.target.value)}
            className="bg-background/50 border-border text-sm"
          />
          <Input
            placeholder="Description / Effect"
            value={sellDescription}
            onChange={(e) => setSellDescription(e.target.value)}
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
              disabled={loading === 'sell'}
              className="bg-accent hover:bg-accent/80 text-sm whitespace-nowrap"
            >
              {loading === 'sell' ? 'Listing...' : 'List Item'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Marketplace;

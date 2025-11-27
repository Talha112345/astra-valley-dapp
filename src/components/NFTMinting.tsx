import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface NFTMintingProps {
  hasIdentity: boolean;
  onMint: (name: string, planet: number, avatarURL: string) => Promise<void>;
}

const PLANETS = [
  { value: 0, name: 'Nova', emoji: '⭐' },
  { value: 1, name: 'Orion', emoji: '🌟' },
  { value: 2, name: 'Vega', emoji: '✨' },
  { value: 3, name: 'Lyra', emoji: '💫' },
  { value: 4, name: 'Solis', emoji: '☀️' },
];

const NFTMinting = ({ hasIdentity, onMint }: NFTMintingProps) => {
  const [name, setName] = useState('');
  const [planet, setPlanet] = useState('0');
  const [avatarURL, setAvatarURL] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMint = async () => {
    if (!name || !planet) return;
    setLoading(true);
    try {
      await onMint(name, parseInt(planet), avatarURL);
      setName('');
      setPlanet('0');
      setAvatarURL('');
    } finally {
      setLoading(false);
    }
  };

  if (hasIdentity) {
    return (
      <Card className="glass-card p-6 border-2 border-accent/20">
        <div className="text-center py-8">
          <Sparkles className="w-16 h-16 mx-auto mb-4 text-accent" />
          <h3 className="text-xl font-orbitron font-bold gradient-text mb-2">
            Identity Already Minted
          </h3>
          <p className="text-muted-foreground">
            You already have a Galactic Identity NFT. Use Planet Travel to explore new worlds!
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass-card p-6 border-2 border-accent/20">
      <h3 className="text-xl font-orbitron font-bold mb-6 gradient-text flex items-center gap-2">
        <Sparkles className="w-6 h-6" />
        Mint Galactic Identity
      </h3>

      <div className="space-y-4">
        <div>
          <Label htmlFor="spaceName" className="text-foreground mb-2">
            Space Name
          </Label>
          <Input
            id="spaceName"
            type="text"
            placeholder="Enter your cosmic name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-background/50 border-border"
          />
        </div>

        <div>
          <Label htmlFor="planet" className="text-foreground mb-2">
            Choose Your Home Planet
          </Label>
          <Select value={planet} onValueChange={setPlanet}>
            <SelectTrigger className="bg-background/50 border-border">
              <SelectValue placeholder="Select a planet" />
            </SelectTrigger>
            <SelectContent>
              {PLANETS.map((p) => (
                <SelectItem key={p.value} value={p.value.toString()}>
                  {p.emoji} {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="avatar" className="text-foreground mb-2">
            Avatar URL (Optional)
          </Label>
          <Input
            id="avatar"
            type="text"
            placeholder="https://... (optional)"
            value={avatarURL}
            onChange={(e) => setAvatarURL(e.target.value)}
            className="bg-background/50 border-border"
          />
        </div>

        <Button
          onClick={handleMint}
          disabled={loading || !name}
          className="w-full bg-gradient-to-r from-accent via-primary to-secondary font-orbitron font-bold h-12 cosmic-glow"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          {loading ? 'Minting Identity...' : 'Mint Identity NFT (0.01 ETH)'}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Your unique Galactic Identity will be minted as an ERC-721 NFT
        </p>
      </div>
    </Card>
  );
};

export default NFTMinting;

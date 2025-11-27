import { useState } from 'react';
import { Rocket } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PlanetTravelProps {
  currentPlanet: string;
  hasIdentity: boolean;
  onTravel: (planet: number) => Promise<void>;
}

const PLANETS = [
  { value: 0, name: 'Nova', emoji: '⭐', description: 'Blazing star of eternal light' },
  { value: 1, name: 'Orion', emoji: '🌟', description: 'Hunter of the cosmic frontier' },
  { value: 2, name: 'Vega', emoji: '✨', description: 'Brightest jewel in the sky' },
  { value: 3, name: 'Lyra', emoji: '💫', description: 'Harmonious celestial melody' },
  { value: 4, name: 'Solis', emoji: '☀️', description: 'Golden heart of warmth' },
];

const PlanetTravel = ({ currentPlanet, hasIdentity, onTravel }: PlanetTravelProps) => {
  const [selectedPlanet, setSelectedPlanet] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTravel = async () => {
    if (!selectedPlanet) return;
    setLoading(true);
    try {
      await onTravel(parseInt(selectedPlanet));
      setSelectedPlanet('');
    } finally {
      setLoading(false);
    }
  };

  if (!hasIdentity) {
    return (
      <Card className="glass-card p-6 border-2 border-secondary/20">
        <div className="text-center py-8">
          <Rocket className="w-16 h-16 mx-auto mb-4 text-secondary opacity-50" />
          <h3 className="text-xl font-orbitron font-bold text-foreground mb-2">
            Planet Travel Locked
          </h3>
          <p className="text-muted-foreground">
            Mint a Galactic Identity NFT first to unlock interplanetary travel!
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass-card p-6 border-2 border-secondary/20">
      <h3 className="text-xl font-orbitron font-bold mb-6 gradient-text flex items-center gap-2">
        <Rocket className="w-6 h-6" />
        Planet Travel
      </h3>

      <div className="glass-card p-4 mb-4 text-center">
        <p className="text-xs text-muted-foreground mb-1">Current Location</p>
        <p className="text-2xl font-orbitron font-bold text-foreground">
          {PLANETS.find((p) => p.name === currentPlanet)?.emoji || '🌍'} {currentPlanet}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Select value={selectedPlanet} onValueChange={setSelectedPlanet}>
            <SelectTrigger className="bg-background/50 border-border">
              <SelectValue placeholder="Select destination planet" />
            </SelectTrigger>
            <SelectContent>
              {PLANETS.filter((p) => p.name !== currentPlanet).map((p) => (
                <SelectItem key={p.value} value={p.value.toString()}>
                  <div>
                    <span className="font-orbitron font-bold">
                      {p.emoji} {p.name}
                    </span>
                    <p className="text-xs text-muted-foreground">{p.description}</p>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleTravel}
          disabled={loading || !selectedPlanet}
          className="w-full bg-secondary hover:bg-secondary/80 font-orbitron font-bold h-12"
        >
          <Rocket className="mr-2 h-5 w-5" />
          {loading ? 'Traveling...' : 'Travel to Planet'}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Travel between planets to explore the cosmic valley
        </p>
      </div>
    </Card>
  );
};

export default PlanetTravel;

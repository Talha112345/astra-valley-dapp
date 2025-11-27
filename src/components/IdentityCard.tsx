import { User, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface IdentityCardProps {
  name: string;
  planet: string;
  avatarURL: string;
  tokenId: string;
}

const PLANET_EMOJIS: { [key: string]: string } = {
  'Nova': '⭐',
  'Orion': '🌟',
  'Vega': '✨',
  'Lyra': '💫',
  'Solis': '☀️',
};

const IdentityCard = ({ name, planet, avatarURL, tokenId }: IdentityCardProps) => {
  return (
    <Card className="glass-card p-6 border-2 border-accent/20">
      <h3 className="text-xl font-orbitron font-bold mb-4 gradient-text flex items-center gap-2">
        <User className="w-6 h-6" />
        Your Galactic Identity
      </h3>

      <div className="glass-card p-4 space-y-3">
        {avatarURL && (
          <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-2 border-primary/50 cosmic-glow">
            <img src={avatarURL} alt={name} className="w-full h-full object-cover" />
          </div>
        )}
        
        <div className="text-center">
          <p className="text-2xl font-orbitron font-bold gradient-text mb-2">{name}</p>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-lg">
              {PLANET_EMOJIS[planet] || '🌍'} {planet}
            </span>
          </div>
        </div>

        <div className="text-center pt-2 border-t border-border/20">
          <p className="text-xs text-muted-foreground">Token ID</p>
          <p className="font-mono text-sm text-foreground">#{tokenId}</p>
        </div>
      </div>
    </Card>
  );
};

export default IdentityCard;

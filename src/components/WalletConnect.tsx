import { Wallet, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WalletConnectProps {
  address: string | null;
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

const WalletConnect = ({ address, isConnected, onConnect, onDisconnect }: WalletConnectProps) => {
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="flex items-center gap-4">
      {!isConnected ? (
        <Button
          onClick={onConnect}
          className="cosmic-glow bg-gradient-to-r from-primary via-accent to-secondary font-orbitron font-bold"
        >
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <div className="glass-card px-4 py-2 font-orbitron text-sm">
            <span className="text-primary">{formatAddress(address!)}</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={onDisconnect}
            className="border-destructive text-destructive hover:bg-destructive hover:text-white"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;

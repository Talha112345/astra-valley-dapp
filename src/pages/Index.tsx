import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import CosmicBackground from '@/components/CosmicBackground';
import WalletConnect from '@/components/WalletConnect';
import UserProfile from '@/components/UserProfile';
import TokenActions from '@/components/TokenActions';
import StakingModule from '@/components/StakingModule';
import NFTMinting from '@/components/NFTMinting';
import PlanetTravel from '@/components/PlanetTravel';
import Marketplace from '@/components/Marketplace';
import ActivityLog, { Activity } from '@/components/ActivityLog';
import { useWeb3 } from '@/hooks/useWeb3';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { address, isConnected, provider, signer, connectWallet, disconnectWallet } = useWeb3();
  const { toast } = useToast();

  // State
  const [balance, setBalance] = useState('0');
  const [stakedAmount, setStakedAmount] = useState('0');
  const [pendingRewards, setPendingRewards] = useState('0');
  const [currentPlanet, setCurrentPlanet] = useState('Unknown');
  const [rank, setRank] = useState('Novice');
  const [hasIdentity, setHasIdentity] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);

  // Add activity to log
  const addActivity = (type: Activity['type'], message: string) => {
    const activity: Activity = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date(),
    };
    setActivities((prev) => [activity, ...prev].slice(0, 20)); // Keep last 20 activities
  };

  // Mock contract addresses (replace with actual deployed addresses)
  const TOKEN_ADDRESS = '0x0000000000000000000000000000000000000000';
  const NFT_ADDRESS = '0x0000000000000000000000000000000000000000';

  // Load user data
  const loadUserData = async () => {
    if (!isConnected || !address) return;

    try {
      // Mock data for demonstration
      setBalance('1000');
      setStakedAmount('500');
      setPendingRewards('25.5');
      setCurrentPlanet('Nova');
      setRank('Explorer');
      setHasIdentity(false);

      addActivity('success', 'User data loaded successfully');
    } catch (error) {
      console.error('Error loading user data:', error);
      addActivity('error', 'Failed to load user data');
    }
  };

  useEffect(() => {
    if (isConnected) {
      loadUserData();
    }
  }, [isConnected, address]);

  // Token Actions
  const handleBuyTokens = async (amount: string) => {
    addActivity('pending', `Buying ${amount} ASTRA tokens...`);
    try {
      // Mock implementation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast({ title: 'Success!', description: `Bought ${amount} ASTRA tokens` });
      addActivity('success', `Successfully bought ${amount} ASTRA tokens`);
      loadUserData();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      addActivity('error', `Failed to buy tokens: ${error.message}`);
    }
  };

  const handleTransferTokens = async (to: string, amount: string) => {
    addActivity('pending', `Transferring ${amount} ASTRA to ${to.slice(0, 10)}...`);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast({ title: 'Success!', description: `Transferred ${amount} ASTRA` });
      addActivity('success', `Successfully transferred ${amount} ASTRA`);
      loadUserData();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      addActivity('error', `Failed to transfer: ${error.message}`);
    }
  };

  const handleBurnTokens = async (amount: string) => {
    addActivity('pending', `Burning ${amount} ASTRA tokens...`);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast({ title: 'Success!', description: `Burned ${amount} ASTRA tokens` });
      addActivity('success', `Successfully burned ${amount} ASTRA tokens`);
      loadUserData();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      addActivity('error', `Failed to burn: ${error.message}`);
    }
  };

  // Staking Actions
  const handleStake = async (amount: string) => {
    addActivity('pending', `Staking ${amount} ASTRA...`);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast({ title: 'Success!', description: `Staked ${amount} ASTRA` });
      addActivity('success', `Successfully staked ${amount} ASTRA`);
      loadUserData();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      addActivity('error', `Failed to stake: ${error.message}`);
    }
  };

  const handleClaimRewards = async () => {
    addActivity('pending', 'Claiming staking rewards...');
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast({ title: 'Success!', description: 'Claimed staking rewards' });
      addActivity('success', `Claimed ${pendingRewards} ASTRA in rewards`);
      loadUserData();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      addActivity('error', `Failed to claim: ${error.message}`);
    }
  };

  const handleUnstake = async () => {
    addActivity('pending', 'Unstaking all ASTRA...');
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast({ title: 'Success!', description: 'Unstaked all ASTRA' });
      addActivity('success', `Unstaked ${stakedAmount} ASTRA`);
      loadUserData();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      addActivity('error', `Failed to unstake: ${error.message}`);
    }
  };

  // NFT Actions
  const handleMintIdentity = async (name: string, planet: number, avatarURL: string) => {
    addActivity('pending', `Minting Galactic Identity: ${name}...`);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast({ title: 'Success!', description: 'Minted Galactic Identity NFT' });
      addActivity('success', `Minted identity "${name}" successfully`);
      setHasIdentity(true);
      loadUserData();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      addActivity('error', `Failed to mint identity: ${error.message}`);
    }
  };

  const handlePlanetTravel = async (planet: number) => {
    const planetNames = ['Nova', 'Orion', 'Vega', 'Lyra', 'Solis'];
    addActivity('pending', `Traveling to ${planetNames[planet]}...`);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast({ title: 'Success!', description: `Traveled to ${planetNames[planet]}` });
      addActivity('success', `Arrived at planet ${planetNames[planet]}`);
      setCurrentPlanet(planetNames[planet]);
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      addActivity('error', `Failed to travel: ${error.message}`);
    }
  };

  // Marketplace Actions
  const handleBuyItem = async (itemId: string, price: string) => {
    addActivity('pending', `Buying marketplace item...`);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast({ title: 'Success!', description: 'Item purchased' });
      addActivity('success', `Purchased item for ${price} ASTRA`);
      loadUserData();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      addActivity('error', `Failed to buy item: ${error.message}`);
    }
  };

  const handleSellItem = async (itemName: string, price: string) => {
    addActivity('pending', `Listing ${itemName} for sale...`);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast({ title: 'Success!', description: 'Item listed for sale' });
      addActivity('success', `Listed "${itemName}" for ${price} ASTRA`);
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      addActivity('error', `Failed to list item: ${error.message}`);
    }
  };

  const handleConnect = async () => {
    try {
      await connectWallet();
      toast({ title: 'Connected!', description: 'Wallet connected successfully' });
      addActivity('success', 'Wallet connected successfully');
    } catch (error: any) {
      toast({ title: 'Error', description: 'Failed to connect wallet', variant: 'destructive' });
      addActivity('error', 'Failed to connect wallet');
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    toast({ title: 'Disconnected', description: 'Wallet disconnected' });
    addActivity('success', 'Wallet disconnected');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CosmicBackground />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-orbitron font-black gradient-text mb-2">
              ASTRA
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">Cosmic Valley DApp</p>
          </div>
          <WalletConnect
            address={address}
            isConnected={isConnected}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
          />
        </header>

        {!isConnected ? (
          <div className="glass-card p-12 text-center border-2 border-primary/20 max-w-2xl mx-auto">
            <div className="text-6xl mb-4">🌌</div>
            <h2 className="text-3xl font-orbitron font-bold gradient-text mb-4">
              Welcome to ASTRA
            </h2>
            <p className="text-muted-foreground mb-8">
              Connect your wallet to explore the Cosmic Valley and start your interstellar journey
            </p>
            <button
              onClick={handleConnect}
              className="px-8 py-4 bg-gradient-to-r from-primary via-accent to-secondary rounded-lg font-orbitron font-bold text-lg cosmic-glow"
            >
              Connect Wallet to Begin
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {/* User Profile */}
            <UserProfile
              address={address}
              planet={currentPlanet}
              rank={rank}
              balance={balance}
              staked={stakedAmount}
              rewards={pendingRewards}
            />

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <TokenActions
                  onBuy={handleBuyTokens}
                  onTransfer={handleTransferTokens}
                  onBurn={handleBurnTokens}
                />
                <StakingModule
                  stakedAmount={stakedAmount}
                  pendingRewards={pendingRewards}
                  onStake={handleStake}
                  onClaim={handleClaimRewards}
                  onUnstake={handleUnstake}
                />
              </div>

              <div className="space-y-6">
                <NFTMinting hasIdentity={hasIdentity} onMint={handleMintIdentity} />
                <PlanetTravel
                  currentPlanet={currentPlanet}
                  hasIdentity={hasIdentity}
                  onTravel={handlePlanetTravel}
                />
              </div>
            </div>

            {/* Marketplace & Activity Log */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Marketplace onBuyItem={handleBuyItem} onSellItem={handleSellItem} />
              <ActivityLog activities={activities} />
            </div>
          </div>
        )}

        {/* Setup Instructions */}
        {isConnected && (
          <div className="mt-12 glass-card p-6 border-2 border-accent/20">
            <h3 className="text-lg font-orbitron font-bold gradient-text mb-3">
              📝 Setup Instructions
            </h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong className="text-foreground">1.</strong> Deploy the smart contracts (AstraToken.sol & AstraIdentity.sol) using Hardhat
              </p>
              <p>
                <strong className="text-foreground">2.</strong> Update contract addresses in the code
              </p>
              <p>
                <strong className="text-foreground">3.</strong> Make sure you're connected to the correct network (e.g., Sepolia testnet)
              </p>
              <p>
                <strong className="text-foreground">4.</strong> Contract files are available in <code className="bg-muted px-1 py-0.5 rounded">src/contracts/</code>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

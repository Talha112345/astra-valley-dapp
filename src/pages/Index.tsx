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
import Inventory, { InventoryItem } from '@/components/Inventory';
import IdentityCard from '@/components/IdentityCard';
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
  const [identityData, setIdentityData] = useState<{name: string, planet: string, avatarURL: string, tokenId: string} | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [stakingBoost, setStakingBoost] = useState(1);

  // Add activity to log
  const addActivity = (type: Activity['type'], message: string) => {
    const activity: Activity = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Unique ID
      type,
      message,
      timestamp: new Date(),
    };
    setActivities((prev) => [activity, ...prev].slice(0, 20)); // Keep last 20 activities
  };

  // Mock contract addresses (replace with actual deployed addresses)
  const TOKEN_ADDRESS = '0x0000000000000000000000000000000000000000';
  const NFT_ADDRESS = '0x0000000000000000000000000000000000000000';

  // Load inventory from localStorage
  useEffect(() => {
    const savedInventory = localStorage.getItem('astra-inventory');
    if (savedInventory) {
      setInventory(JSON.parse(savedInventory));
    }
  }, []);

  // Save inventory to localStorage
  const saveInventory = (items: InventoryItem[]) => {
    localStorage.setItem('astra-inventory', JSON.stringify(items));
    setInventory(items);
  };

  // Load user data
  const loadUserData = async () => {
    if (!isConnected || !address) return;

    try {
      // Mock data for demonstration - in production, fetch from blockchain
      setBalance('1000');
      setStakedAmount('500');
      setPendingRewards((25.5 * stakingBoost).toFixed(1));
      setCurrentPlanet('Nova');
      setRank('Explorer');
      
      // Mock: Check if user has identity NFT
      // In production: const hasNFT = await identityContract.balanceOf(address) > 0;
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
      // Mock implementation - in production, call smart contract
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Update balance immediately
      setBalance((prev) => (parseFloat(prev) + parseFloat(amount)).toString());
      
      toast({ title: 'Success!', description: `Bought ${amount} ASTRA tokens` });
      addActivity('success', `Successfully bought ${amount} ASTRA tokens`);
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      addActivity('error', `Failed to buy tokens: ${error.message}`);
    }
  };

  const handleTransferTokens = async (to: string, amount: string) => {
    addActivity('pending', `Transferring ${amount} ASTRA to ${to.slice(0, 10)}...`);
    try {
      const transferAmount = parseFloat(amount);
      const currentBalance = parseFloat(balance);
      
      if (currentBalance < transferAmount) {
        throw new Error('Insufficient balance');
      }
      
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Update balance immediately
      setBalance((prev) => (parseFloat(prev) - transferAmount).toString());
      
      toast({ title: 'Success!', description: `Transferred ${amount} ASTRA` });
      addActivity('success', `Successfully transferred ${amount} ASTRA`);
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      addActivity('error', `Failed to transfer: ${error.message}`);
    }
  };

  const handleBurnTokens = async (amount: string) => {
    addActivity('pending', `Burning ${amount} ASTRA tokens...`);
    try {
      const burnAmount = parseFloat(amount);
      const currentBalance = parseFloat(balance);
      
      if (currentBalance < burnAmount) {
        throw new Error('Insufficient balance');
      }
      
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Update balance immediately
      setBalance((prev) => (parseFloat(prev) - burnAmount).toString());
      
      toast({ title: 'Success!', description: `Burned ${amount} ASTRA tokens` });
      addActivity('success', `Successfully burned ${amount} ASTRA tokens`);
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      addActivity('error', `Failed to burn: ${error.message}`);
    }
  };

  // Staking Actions
  const handleStake = async (amount: string) => {
    addActivity('pending', `Staking ${amount} ASTRA...`);
    try {
      const stakeAmount = parseFloat(amount);
      const currentBalance = parseFloat(balance);
      
      if (currentBalance < stakeAmount) {
        throw new Error('Insufficient balance');
      }
      
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Update balance and staked amount immediately
      setBalance((prev) => (parseFloat(prev) - stakeAmount).toString());
      setStakedAmount((prev) => (parseFloat(prev) + stakeAmount).toString());
      
      toast({ title: 'Success!', description: `Staked ${amount} ASTRA` });
      addActivity('success', `Successfully staked ${amount} ASTRA`);
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      addActivity('error', `Failed to stake: ${error.message}`);
    }
  };

  const handleClaimRewards = async () => {
    addActivity('pending', 'Claiming staking rewards...');
    try {
      const rewardsAmount = parseFloat(pendingRewards);
      
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Add rewards to balance and reset pending rewards
      setBalance((prev) => (parseFloat(prev) + rewardsAmount).toString());
      setPendingRewards('0');
      
      toast({ title: 'Success!', description: 'Claimed staking rewards' });
      addActivity('success', `Claimed ${rewardsAmount.toFixed(1)} ASTRA in rewards`);
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      addActivity('error', `Failed to claim: ${error.message}`);
    }
  };

  const handleUnstake = async () => {
    addActivity('pending', 'Unstaking all ASTRA...');
    try {
      const unstakeAmount = parseFloat(stakedAmount);
      
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Return staked amount to balance
      setBalance((prev) => (parseFloat(prev) + unstakeAmount).toString());
      setStakedAmount('0');
      
      toast({ title: 'Success!', description: 'Unstaked all ASTRA' });
      addActivity('success', `Unstaked ${unstakeAmount} ASTRA`);
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      addActivity('error', `Failed to unstake: ${error.message}`);
    }
  };

  // NFT Actions
  const handleMintIdentity = async (name: string, planet: number, avatarURL: string) => {
    const planetNames = ['Nova', 'Orion', 'Vega', 'Lyra', 'Solis'];
    addActivity('pending', `Minting Galactic Identity: ${name}...`);
    try {
      // Mock minting - in production, call smart contract
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const identityInfo = {
        name,
        planet: planetNames[planet],
        avatarURL: avatarURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + name,
        tokenId: Math.floor(Math.random() * 10000).toString()
      };
      
      setIdentityData(identityInfo);
      setHasIdentity(true);
      setCurrentPlanet(planetNames[planet]);
      
      toast({ title: 'Success!', description: 'Minted Galactic Identity NFT' });
      addActivity('success', `Minted identity "${name}" successfully`);
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
  const handleBuyItem = async (itemId: string, name: string, emoji: string, price: string, effect: string) => {
    addActivity('pending', `Buying ${name}...`);
    try {
      const itemPrice = parseFloat(price);
      const currentBalance = parseFloat(balance);
      
      if (currentBalance < itemPrice) {
        throw new Error('Insufficient balance');
      }
      
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Deduct price from balance
      setBalance((prev) => (parseFloat(prev) - itemPrice).toString());
      
      const newItem: InventoryItem = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name,
        emoji,
        effect,
        used: false
      };
      
      const updatedInventory = [...inventory, newItem];
      saveInventory(updatedInventory);
      
      toast({ title: 'Success!', description: `Purchased ${name}` });
      addActivity('success', `Purchased ${name} for ${price} ASTRA`);
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      addActivity('error', `Failed to buy item: ${error.message}`);
    }
  };

  const handleSellItem = async (itemName: string, price: string, category: string, description: string) => {
    addActivity('pending', `Listing ${itemName} for sale...`);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast({ title: 'Success!', description: 'Item listed for sale' });
      addActivity('success', `Listed "${itemName}" (${category}) for ${price} ASTRA`);
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      addActivity('error', `Failed to list item: ${error.message}`);
    }
  };

  const handleUseItem = async (itemId: string) => {
    const item = inventory.find(i => i.id === itemId);
    if (!item) return;

    addActivity('pending', `Using ${item.name}...`);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Apply item effects
      if (item.effect.includes('Staking')) {
        setStakingBoost(prev => prev + 0.1);
        addActivity('success', `${item.name} activated! Staking boost increased`);
      } else if (item.effect.includes('Reward')) {
        setStakingBoost(prev => prev + 0.15);
        addActivity('success', `${item.name} activated! Rewards boosted`);
      } else if (item.effect.includes('Multiplier')) {
        setStakingBoost(prev => prev + 0.2);
        addActivity('success', `${item.name} activated! Multiplier enhanced`);
      } else if (item.effect.includes('Glow')) {
        addActivity('success', `${item.name} activated! Avatar glow changed`);
      }
      
      // Mark item as used
      const updatedInventory = inventory.map(i => 
        i.id === itemId ? { ...i, used: true } : i
      );
      saveInventory(updatedInventory);
      
      // Refresh rewards with new boost
      setPendingRewards((25.5 * stakingBoost).toFixed(1));
      
      toast({ title: 'Item Used!', description: `${item.name} effect applied` });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      addActivity('error', `Failed to use item: ${error.message}`);
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

            {/* Identity Card (if minted) */}
            {identityData && (
              <IdentityCard
                name={identityData.name}
                planet={identityData.planet}
                avatarURL={identityData.avatarURL}
                tokenId={identityData.tokenId}
              />
            )}

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

            {/* Marketplace, Inventory & Activity Log */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <Marketplace 
                  onBuyItem={handleBuyItem} 
                  onSellItem={handleSellItem}
                  existingItems={inventory.map(i => i.name.toLowerCase())}
                />
                <Inventory items={inventory} onUseItem={handleUseItem} />
              </div>
              <ActivityLog activities={activities} />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Index;

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title AstraToken
 * @dev ERC-20 Token with buy, burn, stake, and reward mechanics
 */
contract AstraToken is ERC20, Ownable {
    uint256 public constant TOKEN_PRICE = 0.001 ether; // Price per token
    uint256 public constant REWARD_RATE = 100; // 1% per day (100 basis points)
    
    struct StakeInfo {
        uint256 amount;
        uint256 startTime;
        uint256 lastClaimTime;
    }
    
    mapping(address => StakeInfo) public stakes;
    uint256 public totalStaked;
    
    event TokensPurchased(address indexed buyer, uint256 amount, uint256 cost);
    event TokensBurned(address indexed burner, uint256 amount);
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 reward);
    
    constructor() ERC20("ASTRA Token", "ASTRA") Ownable(msg.sender) {
        // Mint initial supply to contract for purchases
        _mint(address(this), 1000000 * 10**decimals());
    }
    
    /**
     * @dev Buy ASTRA tokens with ETH
     */
    function buyTokens(uint256 amount) external payable {
        require(amount > 0, "Amount must be greater than 0");
        uint256 cost = (amount * TOKEN_PRICE) / 10**decimals();
        require(msg.value >= cost, "Insufficient ETH sent");
        require(balanceOf(address(this)) >= amount, "Not enough tokens in contract");
        
        _transfer(address(this), msg.sender, amount);
        
        // Refund excess ETH
        if (msg.value > cost) {
            payable(msg.sender).transfer(msg.value - cost);
        }
        
        emit TokensPurchased(msg.sender, amount, cost);
    }
    
    /**
     * @dev Burn tokens from caller's balance
     */
    function burn(uint256 amount) external {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        _burn(msg.sender, amount);
        emit TokensBurned(msg.sender, amount);
    }
    
    /**
     * @dev Stake tokens to earn rewards
     */
    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        // Claim any pending rewards before staking more
        if (stakes[msg.sender].amount > 0) {
            _claimRewards(msg.sender);
        }
        
        _transfer(msg.sender, address(this), amount);
        
        stakes[msg.sender].amount += amount;
        stakes[msg.sender].startTime = block.timestamp;
        stakes[msg.sender].lastClaimTime = block.timestamp;
        totalStaked += amount;
        
        emit Staked(msg.sender, amount);
    }
    
    /**
     * @dev Calculate pending rewards for a user
     */
    function getPendingRewards(address user) public view returns (uint256) {
        StakeInfo memory userStake = stakes[user];
        if (userStake.amount == 0) return 0;
        
        uint256 timeStaked = block.timestamp - userStake.lastClaimTime;
        uint256 reward = (userStake.amount * REWARD_RATE * timeStaked) / (10000 * 1 days);
        
        return reward;
    }
    
    /**
     * @dev Claim staking rewards
     */
    function claimRewards() external {
        require(stakes[msg.sender].amount > 0, "No active stake");
        _claimRewards(msg.sender);
    }
    
    function _claimRewards(address user) internal {
        uint256 reward = getPendingRewards(user);
        if (reward > 0) {
            stakes[user].lastClaimTime = block.timestamp;
            _mint(user, reward);
            emit RewardsClaimed(user, reward);
        }
    }
    
    /**
     * @dev Unstake tokens
     */
    function unstake() external {
        StakeInfo memory userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No active stake");
        
        // Claim rewards before unstaking
        _claimRewards(msg.sender);
        
        uint256 amount = userStake.amount;
        stakes[msg.sender].amount = 0;
        stakes[msg.sender].startTime = 0;
        stakes[msg.sender].lastClaimTime = 0;
        totalStaked -= amount;
        
        _transfer(address(this), msg.sender, amount);
        
        emit Unstaked(msg.sender, amount);
    }
    
    /**
     * @dev Get stake info for a user
     */
    function getStakeInfo(address user) external view returns (uint256 amount, uint256 startTime, uint256 pendingRewards) {
        StakeInfo memory userStake = stakes[user];
        return (userStake.amount, userStake.startTime, getPendingRewards(user));
    }
    
    /**
     * @dev Withdraw ETH from contract (owner only)
     */
    function withdrawETH() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    receive() external payable {}
}

# ASTRA Smart Contracts

## Deployment Instructions

### Prerequisites
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox @openzeppelin/contracts
```

### Hardhat Configuration

Create `hardhat.config.js`:

```javascript
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  },
  paths: {
    sources: "./src/contracts",
    artifacts: "./src/contracts/artifacts"
  }
};
```

### Deploy Script

Create `scripts/deploy.js`:

```javascript
const hre = require("hardhat");

async function main() {
  console.log("Deploying ASTRA contracts...");

  // Deploy AstraToken
  const AstraToken = await hre.ethers.getContractFactory("AstraToken");
  const astraToken = await AstraToken.deploy();
  await astraToken.waitForDeployment();
  const tokenAddress = await astraToken.getAddress();
  console.log("AstraToken deployed to:", tokenAddress);

  // Deploy AstraIdentity
  const AstraIdentity = await hre.ethers.getContractFactory("AstraIdentity");
  const astraIdentity = await AstraIdentity.deploy();
  await astraIdentity.waitForDeployment();
  const nftAddress = await astraIdentity.getAddress();
  console.log("AstraIdentity deployed to:", nftAddress);

  console.log("\nUpdate these addresses in your frontend:");
  console.log("TOKEN_ADDRESS:", tokenAddress);
  console.log("NFT_ADDRESS:", nftAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

### Environment Setup

Create `.env`:
```
SEPOLIA_RPC_URL=your_alchemy_or_infura_url
PRIVATE_KEY=your_wallet_private_key
```

### Deploy Commands

```bash
# Compile contracts
npx hardhat compile

# Deploy to local network
npx hardhat run scripts/deploy.js --network localhost

# Deploy to Sepolia testnet
npx hardhat run scripts/deploy.js --network sepolia
```

### After Deployment

1. Copy the deployed contract addresses
2. Update `TOKEN_ADDRESS` and `NFT_ADDRESS` in `src/pages/Index.tsx`
3. The contract ABIs will be generated in `src/contracts/artifacts/`

## Contract Details

### AstraToken (ERC-20)
- **Buy tokens**: 0.001 ETH per token
- **Staking**: 1% daily rewards
- **Functions**: buyTokens, transfer, burn, stake, claimRewards, unstake

### AstraIdentity (ERC-721)
- **Mint price**: 0.01 ETH
- **Planets**: Nova, Orion, Vega, Lyra, Solis
- **Functions**: mintIdentity, updatePlanet, getIdentity

## Testing

Create test files in `test/` directory:

```bash
npx hardhat test
```

## Verification (Optional)

```bash
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
```

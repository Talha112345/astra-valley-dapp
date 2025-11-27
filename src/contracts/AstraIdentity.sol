// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title AstraIdentity
 * @dev ERC-721 NFT representing Galactic Identities with planets
 */
contract AstraIdentity is ERC721, Ownable {
    using Strings for uint256;
    
    uint256 private _tokenIdCounter;
    uint256 public constant MINT_PRICE = 0.01 ether;
    
    enum Planet { Nova, Orion, Vega, Lyra, Solis }
    
    struct Identity {
        string name;
        Planet planet;
        string avatarURL;
        uint256 mintedAt;
    }
    
    mapping(uint256 => Identity) public identities;
    mapping(address => uint256) public userIdentity; // One identity per user
    
    event IdentityMinted(address indexed owner, uint256 tokenId, string name, Planet planet);
    event PlanetChanged(uint256 indexed tokenId, Planet newPlanet);
    
    constructor() ERC721("ASTRA Identity", "ASTRAID") Ownable(msg.sender) {
        _tokenIdCounter = 1; // Start from 1
    }
    
    /**
     * @dev Mint a new Galactic Identity NFT
     */
    function mintIdentity(
        string memory name,
        Planet planet,
        string memory avatarURL
    ) external payable returns (uint256) {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(msg.value >= MINT_PRICE, "Insufficient ETH for minting");
        require(userIdentity[msg.sender] == 0, "User already has an identity");
        
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        _safeMint(msg.sender, tokenId);
        
        identities[tokenId] = Identity({
            name: name,
            planet: planet,
            avatarURL: avatarURL,
            mintedAt: block.timestamp
        });
        
        userIdentity[msg.sender] = tokenId;
        
        emit IdentityMinted(msg.sender, tokenId, name, planet);
        
        // Refund excess ETH
        if (msg.value > MINT_PRICE) {
            payable(msg.sender).transfer(msg.value - MINT_PRICE);
        }
        
        return tokenId;
    }
    
    /**
     * @dev Update the planet of an identity (travel to new planet)
     */
    function updatePlanet(uint256 tokenId, Planet newPlanet) external {
        require(ownerOf(tokenId) == msg.sender, "Not the owner of this identity");
        identities[tokenId].planet = newPlanet;
        emit PlanetChanged(tokenId, newPlanet);
    }
    
    /**
     * @dev Get identity details
     */
    function getIdentity(uint256 tokenId) external view returns (
        string memory name,
        Planet planet,
        string memory avatarURL,
        uint256 mintedAt,
        address owner
    ) {
        require(_ownerOf(tokenId) != address(0), "Identity does not exist");
        Identity memory identity = identities[tokenId];
        return (
            identity.name,
            identity.planet,
            identity.avatarURL,
            identity.mintedAt,
            ownerOf(tokenId)
        );
    }
    
    /**
     * @dev Get planet name as string
     */
    function getPlanetName(Planet planet) public pure returns (string memory) {
        if (planet == Planet.Nova) return "Nova";
        if (planet == Planet.Orion) return "Orion";
        if (planet == Planet.Vega) return "Vega";
        if (planet == Planet.Lyra) return "Lyra";
        if (planet == Planet.Solis) return "Solis";
        return "Unknown";
    }
    
    /**
     * @dev Get user's identity token ID
     */
    function getUserIdentityId(address user) external view returns (uint256) {
        return userIdentity[user];
    }
    
    /**
     * @dev Check if user has an identity
     */
    function hasIdentity(address user) external view returns (bool) {
        return userIdentity[user] != 0;
    }
    
    /**
     * @dev Withdraw ETH from contract (owner only)
     */
    function withdrawETH() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    /**
     * @dev Override transfer to update userIdentity mapping
     */
    function _update(address to, uint256 tokenId, address auth) internal virtual override returns (address) {
        address from = _ownerOf(tokenId);
        
        if (from != address(0)) {
            userIdentity[from] = 0;
        }
        if (to != address(0)) {
            userIdentity[to] = tokenId;
        }
        
        return super._update(to, tokenId, auth);
    }
}

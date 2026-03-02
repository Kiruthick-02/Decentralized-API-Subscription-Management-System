// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract APISubscription {
    address public owner;
    
    enum Tier { BASIC, PREMIUM }

    struct TierConfig {
        uint256 fee;
        uint256 duration;
    }

    struct Subscription {
        uint256 expiry;
        Tier tier;
        bool active;
    }

    mapping(Tier => TierConfig) public tierConfigs;
    mapping(address => Subscription) public subscriptions;

    event Subscribed(address indexed user, Tier tier, uint256 expiry);

    constructor() {
        owner = msg.sender;
        // Basic: 0.01 ETH for 30 days
        tierConfigs[Tier.BASIC] = TierConfig(0.01 ether, 30 days);
        // Premium: 0.05 ETH for 90 days
        tierConfigs[Tier.PREMIUM] = TierConfig(0.05 ether, 90 days);
    }

    function subscribe(Tier _tier) external payable {
        TierConfig memory config = tierConfigs[_tier];
        require(msg.value == config.fee, "Incorrect ETH amount");

        uint256 currentExpiry = subscriptions[msg.sender].expiry;
        uint256 startTimestamp = (currentExpiry > block.timestamp) ? currentExpiry : block.timestamp;
        
        subscriptions[msg.sender] = Subscription({
            expiry: startTimestamp + config.duration,
            tier: _tier,
            active: true
        });

        emit Subscribed(msg.sender, _tier, subscriptions[msg.sender].expiry);
    }

    function getSubscription(address _user) external view returns (uint256, Tier, bool) {
        Subscription memory sub = subscriptions[_user];
        bool stillValid = sub.active && sub.expiry > block.timestamp;
        return (sub.expiry, sub.tier, stillValid);
    }

    function withdraw() external {
        require(msg.sender == owner, "Not owner");
        payable(owner).transfer(address(this).balance);
    }
}
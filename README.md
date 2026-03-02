# 🚀 Decentralized API Subscription Management System
    A professional Web3 SaaS platform that decentralizes API access management using Ethereum Smart Contracts. This system replaces traditional credit card subscriptions with secure, on-chain ETH payments and automated time-based access control.
## 🌟 Key Features
**Tiered Subscription Model:** Supports multiple access levels (Basic vs. Premium) with different pricing and durations managed entirely on-chain.
**Automated Expiry Logic:**  Uses block.timestamp to calculate and enforce subscription validity without the need for a centralized database.
**Smart Contract Extensions:** Intelligent logic that allows users to extend their current subscription by appending new time to their existing expiry date.
**Modern Web3 UI:** A high-performance dashboard built with Next.js, featuring "Glassmorphism" design and real-time blockchain data fetching.
**Seamless Onboarding:** Integrated with RainbowKit and Wagmi for automatic network detection and a smooth wallet connection experience.
**Secure Fund Management:** Only the contract owner can withdraw the accumulated subscription fees via a secure, modifier-protected function.

## 🛠️ Tech Stack
**Smart Contracts:** Solidity (^0.8.19)
**Development Environment:** Hardhat (Local Node & Testing)
**Frontend Framework:** Next.js 14, React
**Styling:** Tailwind CSS (Modern Dark Mode)
**Blockchain Interface:** Wagmi Hooks & Viem
**Wallet Connection:** RainbowKit
**Icons:** Lucide-React & FontAwesome

## 📂 Project Architecture
The project follows a Decoupled Mono-repo structure for better scalability:
**/backend:** Contains the Solidity source code, Hardhat configuration, deployment scripts, and automated unit tests.
**/frontend:** The Next.js application, including custom React components and blockchain providers.

## 🚀 Quick Start
**Clone the Repo:** git clone [your-repo-link]
**//Setup Backend:**
cd backend && npm install
Start local node: npx hardhat node
Deploy: npx hardhat run scripts/deploy.js --network localhost

**//Setup Frontend:** 
cd frontend && npm install
Update CONTRACT_ADDRESS in index.tsx
Run: npm run dev

## 📜 Smart Contract Logic
The core logic resides in APISubscription.sol. It utilizes an enum for Tier levels and a mapping(address => Subscription) to track user states. Access is verified by comparing block.timestamp against the stored expiry value, ensuring a trustless "pay-to-play" model for API providers.
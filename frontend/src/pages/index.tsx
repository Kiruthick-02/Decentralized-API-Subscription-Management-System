import Navbar from '../components/Navbar';
import PricingCard from '../components/PricingCard';
import { useAccount, useReadContract } from 'wagmi';
import contractAbi from '../contracts/APISubscription.json';

// 🛠️ PASTE YOUR LATEST DEPLOYED ADDRESS HERE
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function Home() {
  const { address, isConnected } = useAccount();

  // Read User Subscription Status from Blockchain
  const { data: subData, refetch }: any = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: contractAbi.abi,
    functionName: 'getSubscription',
    args: [address],
    query: {
        enabled: !!address, // Only fetch if wallet is connected
    }
  });

  // Helper to check if user is currently active (expiry > current time)
  const isUserActive = isConnected && subData && subData[2] === true;

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
            Power your Apps with <br/> our Decentralized API
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Secure, fast, and pay-as-you-go access managed by Smart Contracts.
          </p>
        </section>

        {/* 📊 Dashboard Card (Only shows when user has a valid sub) */}
        {isUserActive && (
          <div className="max-w-4xl mx-auto bg-indigo-600/10 border border-indigo-500/40 backdrop-blur-xl p-8 rounded-3xl mb-16 flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl shadow-indigo-500/10">
            <div>
              <p className="text-indigo-400 text-xs uppercase font-black tracking-widest mb-1">Status: Active Subscription</p>
              <h2 className="text-3xl font-bold">
                Expires: {(() => {
                  const d = new Date(Number(subData[0]) * 1000);
                  const day = String(d.getDate()).padStart(2, '0');
                  const month = String(d.getMonth() + 1).padStart(2, '0');
                  const year = d.getFullYear();
                  return `${day}/${month}/${year}`;
                })()}
              </h2>
            </div>
            <div className="bg-slate-900/80 border border-slate-700 px-6 py-3 rounded-2xl font-mono text-sm text-indigo-300">
              <span className="text-slate-500 mr-2">API_KEY:</span> 
              {address?.substring(0,12)}... (Verified)
            </div>
          </div>
        )}

        {/* 💎 Pricing Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <PricingCard 
            tier={0} name="Basic Plan" price="0.01" duration="30" 
            address={CONTRACT_ADDRESS} abi={contractAbi.abi} 
            onSuccess={() => refetch()} 
          />
          <PricingCard 
            tier={1} name="Premium Plan" price="0.05" duration="90" 
            address={CONTRACT_ADDRESS} abi={contractAbi.abi} 
            onSuccess={() => refetch()} 
          />
        </div>

        <footer className="mt-20 text-center text-slate-600 text-sm">
          &copy; 2026 APIPRO.IO • Built on Ethereum Localhost
        </footer>
      </main>
    </div>
  );
}
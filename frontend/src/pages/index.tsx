import Navbar from '../components/Navbar';
import PricingCard from '../components/PricingCard';
import { useAccount, useReadContract } from 'wagmi';
import contractAbi from '../contracts/APISubscription.json';

const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export default function Home() {
  const { address, isConnected } = useAccount();

  // Read User Subscription Status
  const { data: subData }: any = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: contractAbi.abi,
    functionName: 'getSubscription',
    args: [address],
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-6 py-20">
        <section className="text-center mb-20">
          <h1 className="text-6xl font-extrabold mb-6">Power your Apps with <br/> our Decentralized API</h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            Secure, fast, and pay-as-you-go access via Smart Contracts.
          </p>
        </section>

        {isConnected && subData && subData[2] && (
          <div className="bg-indigo-600/20 border border-indigo-500/50 p-6 rounded-2xl mb-12 flex justify-between items-center">
            <div>
              <p className="text-indigo-300 text-sm uppercase font-bold tracking-widest">Active Subscription</p>
              <h2 className="text-2xl font-bold">
  Expires: {(() => {
    const d = new Date(Number(subData[0]) * 1000);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  })()}
</h2>
            </div>
            <div className="bg-indigo-500 px-4 py-2 rounded-lg font-mono text-sm">
              API_KEY: {address?.substring(0,10)}... (Verified)
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <PricingCard tier={0} name="Basic Plan" price="0.01" duration="30" address={CONTRACT_ADDRESS} abi={contractAbi.abi} />
          <PricingCard tier={1} name="Premium Plan" price="0.05" duration="90" address={CONTRACT_ADDRESS} abi={contractAbi.abi} />
        </div>
      </main>
    </div>
  );
}
import { parseEther } from 'viem';
import { useWriteContract } from 'wagmi';

export default function PricingCard({ tier, name, price, duration, abi, address }: any) {
  const { writeContract } = useWriteContract();

  return (
    <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-3xl hover:border-indigo-500 transition-all">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <div className="text-4xl font-bold mb-4">{price} ETH</div>
      <p className="text-slate-400 mb-6">Full API access for {duration} days</p>
      <button 
        onClick={() => writeContract({
          address: address as `0x${string}`,
          abi,
          functionName: 'subscribe',
          args: [tier],
          value: parseEther(price)
        })}
        className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-semibold transition-colors"
      >
        Buy Now
      </button>
    </div>
  );
}
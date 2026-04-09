import { parseEther } from 'viem';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useEffect } from 'react';
import { CheckCircle2, Rocket, ShieldCheck } from 'lucide-react';

export default function PricingCard({ tier, name, price, duration, abi, address, onSuccess }: any) {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  // ⛓️ This hook waits for the block to be confirmed on the blockchain
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash });

  // 🔄 Trigger the UI refresh in index.tsx once payment is confirmed
  useEffect(() => {
    if (isConfirmed) {
      onSuccess();
    }
  }, [isConfirmed]);

  return (
    <div className={`relative overflow-hidden bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] transition-all duration-300 ${isConfirmed ? 'border-green-500/50 ring-1 ring-green-500/20' : 'hover:border-indigo-500/50 hover:bg-slate-900/60'}`}>
      
      {tier === 1 && (
        <div className="absolute top-4 right-4 bg-indigo-500 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter">Best Value</div>
      )}

      <h3 className="text-xl font-bold text-slate-200 mb-1">{name}</h3>
      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-4xl font-black text-white">{price} ETH</span>
        <span className="text-slate-500 text-sm">/ {duration} days</span>
      </div>

      <ul className="space-y-3 mb-8 text-sm text-slate-400">
        <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-indigo-400"/> Unlimited Requests</li>
        <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-indigo-400"/> 99.9% Uptime SLA</li>
        <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-indigo-400"/> Community Support</li>
      </ul>
      
      <button 
        disabled={isPending || isConfirming}
        onClick={() => writeContract({
          address: address as `0x${string}`,
          abi,
          functionName: 'subscribe',
          args: [tier],
          value: parseEther(price)
        })}
        className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-indigo-400 hover:text-white disabled:bg-slate-800 disabled:text-slate-600 py-4 rounded-2xl font-bold transition-all active:scale-95"
      >
        {isPending ? (
          "Confirm in Wallet..."
        ) : isConfirming ? (
          <>
            <div className="h-4 w-4 border-2 border-slate-400 border-t-white rounded-full animate-spin"></div>
            Mining Transaction...
          </>
        ) : (
          <>
            <Rocket size={18} />
            Buy {name}
          </>
        )}
      </button>

      {isConfirmed && (
        <div className="mt-4 flex items-center justify-center gap-2 text-green-400 font-bold animate-bounce">
          <CheckCircle2 size={18} /> Subscribed Successfully!
        </div>
      )}

      {error && (
        <p className="mt-4 text-red-400 text-xs text-center">
          Error: {error.message.includes("insufficient funds") ? "Insufficient ETH" : "User Rejected"}
        </p>
      )}
    </div>
  );
}
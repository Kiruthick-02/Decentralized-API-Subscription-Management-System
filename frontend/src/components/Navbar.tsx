import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import { LogOut } from 'lucide-react'; // Elegant logout icon

export default function Navbar() {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <nav className="flex justify-between items-center p-6 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
        APIPRO.IO
      </div>
      
      <div className="flex items-center gap-4">
        <ConnectButton showBalance={false} chainStatus="none" />
        
        {/* Dedicated Disconnect Button - Only shows when connected */}
        {isConnected && (
          <button 
            onClick={() => disconnect()}
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all border border-transparent hover:border-red-400/20"
            title="Disconnect Wallet"
          >
            <LogOut size={20} />
          </button>
        )}
      </div>
    </nav>
  );
}
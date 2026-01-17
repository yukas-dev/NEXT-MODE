
import React from 'react';

interface WelcomeModalProps {
  onDismiss: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onDismiss }) => {
  return (
    <div className="fixed inset-0 bg-black/98 flex items-center justify-center p-4 sm:p-8 z-[200] backdrop-blur-3xl overflow-y-auto no-scrollbar">
      <div className="max-w-xl w-full border-2 border-green-500 p-8 sm:p-16 rounded-2xl bg-[#020202] text-center shadow-[0_0_120px_rgba(34,197,94,0.2)] relative overflow-hidden my-auto">
        
        {/* Futuristic background grid effect */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="w-16 sm:w-20 h-1 sm:h-1.5 bg-green-500 mx-auto mb-8 sm:mb-12 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.8)]"></div>
        
        <h2 className="text-2xl sm:text-3xl font-black font-mono text-green-500 mb-8 sm:mb-12 tracking-[0.2em] sm:tracking-[0.3em] uppercase">INICIALIZAÇÃO COMPLETA</h2>
        
        <div className="space-y-8 sm:space-y-10 text-green-400 font-mono text-[11px] sm:text-sm leading-relaxed text-left">
          <p className="opacity-70 text-[10px] tracking-widest">PROTOCOLO NEW GROUND ATIVADO:</p>
          <div className="pl-4 sm:pl-6 border-l-2 border-green-500/30 space-y-4 sm:space-y-6">
            <p className="text-base sm:text-lg">“Bem-vindo à New Ground.</p>
            <p className="font-black text-lg sm:text-xl text-white">Estamos felizes em te receber.</p>
            <p className="opacity-70 italic text-xs sm:text-sm">A nova era começa com direção.”</p>
          </div>
        </div>

        <button 
          onClick={onDismiss}
          className="mt-12 sm:mt-20 w-full bg-green-500 hover:bg-green-400 text-black font-black py-5 sm:py-6 rounded-xl transition-all font-mono text-[10px] sm:text-xs tracking-[0.4em] sm:tracking-[0.6em] shadow-[0_0_40px_rgba(34,197,94,0.3)] animate-pulse uppercase"
        >
          ACESSAR INTERFACE
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;

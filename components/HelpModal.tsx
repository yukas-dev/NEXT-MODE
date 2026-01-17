
import React from 'react';
import { Icons } from '../constants';

interface HelpModalProps {
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 sm:p-8 z-[150] backdrop-blur-2xl overflow-y-auto no-scrollbar">
      <div className="max-w-2xl w-full border border-green-500/40 bg-[#050505] rounded-2xl p-6 sm:p-12 shadow-[0_0_100px_rgba(34,197,94,0.1)] relative animate-in fade-in zoom-in duration-500 my-auto">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-green-500"></div>
        
        <div className="flex justify-between items-center mb-8 sm:mb-10">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 bg-green-500/10 rounded-lg border border-green-500/20">
              <Icons.Help className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
            </div>
            <h2 className="text-[10px] sm:text-sm font-black text-green-500 uppercase tracking-[0.3em] sm:tracking-[0.5em]">Central de Diretrizes</h2>
          </div>
          <button onClick={onClose} className="text-green-900 hover:text-green-500 transition-all p-1">
            <Icons.X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="space-y-6 sm:space-y-8 text-green-600 font-mono text-[10px] sm:text-xs leading-relaxed">
          <p className="text-white text-sm sm:text-base mb-6 sm:mb-8 font-sans font-medium">
            Next Mode: Plataforma de Gestão de Vida e Alta Performance da New Ground Tech.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="p-4 sm:p-6 border border-green-500/20 bg-green-500/5 rounded-xl">
              <p className="text-green-400 font-black mb-2 uppercase tracking-[0.2em]">01. OPERAÇÃO</p>
              <p className="text-[10px] sm:text-[11px]">Registre focos específicos para cada área da sua vida. Defina o esforço necessário.</p>
            </div>
            <div className="p-4 sm:p-6 border border-green-500/20 bg-green-500/5 rounded-xl">
              <p className="text-green-400 font-black mb-2 uppercase tracking-[0.2em]">02. EVOLUÇÃO</p>
              <p className="text-[10px] sm:text-[11px]">Ao finalizar uma meta, sua conta recebe XP. O XP é a métrica da sua constância.</p>
            </div>
            <div className="p-4 sm:p-6 border border-green-500/20 bg-green-500/5 rounded-xl">
              <p className="text-green-400 font-black mb-2 uppercase tracking-[0.2em]">03. AUDITORIA</p>
              <p className="text-[10px] sm:text-[11px]">Acompanhe seu índice de foco. Metas encerradas sem conclusão afetam seu histórico.</p>
            </div>
            <div className="p-4 sm:p-6 border border-green-500/20 bg-green-500/5 rounded-xl">
              <p className="text-green-400 font-black mb-2 uppercase tracking-[0.2em]">04. MINDSET</p>
              <p className="text-[10px] sm:text-[11px]">A nova era exige clareza. Não é sobre velocidade, é sobre direção constante.</p>
            </div>
          </div>

          <p className="text-center py-4 sm:py-6 border-y border-green-500/10 text-green-400/60 font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase mt-8 sm:mt-10">
            “Evolução começa com direção.”
          </p>

          <div className="bg-green-500/10 border border-green-500/30 p-6 sm:p-8 rounded-2xl flex flex-col items-center gap-4 glow-green">
            <p className="text-[10px] sm:text-[11px] text-green-400 uppercase tracking-[0.3em] sm:tracking-[0.4em] font-black text-center">Suporte Operacional</p>
            <a 
              href="https://wa.me/5585987435762" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 sm:gap-4 text-white hover:text-green-400 transition-all font-sans text-base sm:text-lg bg-black px-6 sm:px-8 py-2 sm:py-3 rounded-full border border-green-500/20"
            >
              <span className="text-xl sm:text-2xl">📱</span>
              <span className="font-black">85 98743-5762</span>
            </a>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="mt-8 sm:mt-10 w-full bg-green-500 hover:bg-green-400 text-black font-black py-4 sm:py-5 rounded-xl text-[10px] sm:text-[11px] tracking-[0.4em] sm:tracking-[0.5em] uppercase transition-all shadow-lg"
        >
          RETORNAR AO SISTEMA
        </button>
      </div>
    </div>
  );
};

export default HelpModal;

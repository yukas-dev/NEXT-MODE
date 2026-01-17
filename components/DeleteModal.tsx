
import React, { useState } from 'react';
import { DeletionReason } from '../types';
import { Icons } from '../constants';

interface DeleteModalProps {
  onClose: () => void;
  onConfirm: (reason: DeletionReason) => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onClose, onConfirm }) => {
  const [reason, setReason] = useState<DeletionReason>(DeletionReason.NAO_PRIORIDADE);

  return (
    <div className="fixed inset-0 bg-black/98 flex items-center justify-center p-4 sm:p-6 z-[160] backdrop-blur-2xl overflow-y-auto no-scrollbar">
      <div className="w-full max-w-lg bg-[#050505] border border-red-500/30 rounded-2xl p-6 sm:p-12 shadow-[0_0_80px_rgba(239,68,68,0.1)] relative my-auto">
        <div className="absolute top-0 left-0 w-full h-[3px] sm:h-[4px] bg-red-600"></div>

        <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="p-2 sm:p-3 bg-red-500/10 rounded-xl border border-red-500/20">
            <Icons.Trash className="w-5 sm:w-6 h-5 sm:h-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-red-600 uppercase tracking-[0.2em] sm:tracking-[0.3em]">Abortar Operação</h2>
            <p className="text-[9px] sm:text-[10px] text-red-900 uppercase font-bold tracking-widest mt-1">Status: Crítico</p>
          </div>
        </div>

        <p className="text-white/80 text-xs sm:text-sm mb-8 sm:mb-10 leading-relaxed font-sans">
          O encerramento prematuro de um foco requer a seleção do motivo para registro no log de evolução:
        </p>
        
        <div className="space-y-3 sm:space-y-4 mb-10 sm:mb-14">
          {Object.values(DeletionReason).map(r => (
            <button
              key={r}
              onClick={() => setReason(r)}
              className={`w-full text-left p-4 sm:p-5 rounded-xl border text-[9px] sm:text-[10px] font-black tracking-[0.1em] sm:tracking-[0.2em] uppercase transition-all flex justify-between items-center ${
                reason === r ? 'border-red-600 bg-red-500/10 text-red-500' : 'border-green-950/20 bg-black text-green-900 hover:border-red-500/30'
              }`}
            >
              {r}
              {reason === r && <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 shadow-[0_0_5px_red]"></div>}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <button 
            onClick={onClose}
            className="order-2 sm:order-1 flex-1 text-green-800 py-4 rounded-xl text-[10px] font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase hover:text-green-500 transition-colors border border-green-500/10"
          >
            CANCELAR
          </button>
          <button 
            onClick={() => onConfirm(reason)}
            className="order-1 sm:order-2 flex-1 bg-red-600 hover:bg-red-500 text-black py-4 rounded-xl text-[10px] font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase transition-all shadow-[0_10px_25px_rgba(220,38,38,0.2)]"
          >
            CONFIRMAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

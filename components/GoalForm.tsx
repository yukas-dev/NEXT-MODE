
import React, { useState } from 'react';
import { Goal, Category, EffortLevel } from '../types';
import { Icons } from '../constants';

interface GoalFormProps {
  goal?: Goal;
  onClose: () => void;
  onSave: (data: Partial<Goal>) => void;
}

const GoalForm: React.FC<GoalFormProps> = ({ goal, onClose, onSave }) => {
  const [title, setTitle] = useState(goal?.title || '');
  const [description, setDescription] = useState(goal?.description || '');
  const [category, setCategory] = useState<Category>(goal?.category || Category.VIDA);
  const [effort, setEffort] = useState<EffortLevel>(goal?.effort || EffortLevel.BAIXO);
  const [deadline, setDeadline] = useState(goal?.deadline || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    onSave({ title, description, category, effort, deadline });
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 z-[110] overflow-y-auto no-scrollbar">
      <div className="w-full max-w-2xl bg-[#050505] border border-green-500/40 rounded-2xl p-6 sm:p-12 shadow-[0_0_80px_rgba(34,197,94,0.1)] relative overflow-hidden my-auto">
        <div className="absolute top-0 left-0 w-full h-1 sm:h-1.5 bg-green-500"></div>

        <div className="flex justify-between items-center mb-8 sm:mb-12">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-green-500 uppercase tracking-tighter">
              {goal ? 'AJUSTAR PROTOCOLO' : 'REGISTRAR NOVO FOCO'}
            </h2>
            <p className="text-[9px] sm:text-[11px] text-green-800 mt-2 uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold">Módulo de Configuração de Evolução</p>
          </div>
          <button onClick={onClose} className="text-green-900 hover:text-green-500 transition-all p-2 bg-green-500/5 rounded-full border border-green-500/10">
            <Icons.X className="w-5 h-5 sm:w-6 sm:h-6"/>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-10">
          <div className="space-y-6 sm:space-y-8">
            <div className="group">
              <label className="block text-green-500 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-3 sm:mb-4">Título do Objetivo</label>
              <input 
                required
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black border border-green-950 rounded-lg p-4 sm:p-5 text-sm sm:text-base text-white focus:outline-none focus:border-green-500 transition-all placeholder:text-green-950 font-medium"
                placeholder="Ex: Domínio de Arquitetura de Sistemas"
              />
            </div>

            <div className="group">
              <label className="block text-green-500 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-3 sm:mb-4">Contexto de Execução</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-black border border-green-950 rounded-lg p-4 sm:p-5 text-xs sm:text-sm text-white focus:outline-none focus:border-green-500 transition-all h-24 sm:h-32 resize-none"
                placeholder="Descreva os parâmetros para o sucesso deste foco..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
              <div className="group">
                <label className="block text-green-500 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-3 sm:mb-4">Impacto</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full bg-black border border-green-950 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-white focus:outline-none focus:border-green-500 cursor-pointer appearance-none uppercase font-bold tracking-widest"
                >
                  {Object.values(Category).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="group">
                <label className="block text-green-500 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-3 sm:mb-4">Esforço Operacional</label>
                <select 
                  value={effort}
                  onChange={(e) => setEffort(e.target.value as EffortLevel)}
                  className="w-full bg-black border border-green-950 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-white focus:outline-none focus:border-green-500 cursor-pointer appearance-none uppercase font-bold tracking-widest"
                >
                  {Object.values(EffortLevel).map(lvl => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="group">
              <label className="block text-green-500 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-3 sm:mb-4">Data de Auditoria Final</label>
              <input 
                type="date" 
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-black border border-green-950 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-white focus:outline-none focus:border-green-500"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-green-500 hover:bg-green-400 text-black font-black py-4 sm:py-5 rounded-xl text-[10px] sm:text-xs tracking-[0.4em] sm:tracking-[0.5em] transition-all transform hover:translate-y-[-4px] shadow-[0_10px_30px_rgba(34,197,94,0.2)]"
          >
            {goal ? 'ATUALIZAR PROTOCOLO' : 'AUTORIZAR INICIALIZAÇÃO'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GoalForm;

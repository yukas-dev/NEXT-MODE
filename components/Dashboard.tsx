
import React, { useState, useEffect } from 'react';
import { AppState, Goal, Category, EffortLevel, GoalStatus, DeletionReason } from '../types';
import { Icons, EFFORT_POINTS, COLORS } from '../constants';
import GoalForm from './GoalForm';
import WelcomeModal from './WelcomeModal';
import DeleteModal from './DeleteModal';
import HelpModal from './HelpModal';

interface DashboardProps {
  state: AppState;
  onLogout: () => void;
  onUpdateGoals: (goals: Goal[]) => void;
  onUpdateScore: (points: number) => void;
  onWelcomeSeen: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ state, onLogout, onUpdateGoals, onUpdateScore, onWelcomeSeen }) => {
  const [activeTab, setActiveTab] = useState<'metas' | 'progresso' | 'historico'>('metas');
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [deletingGoalId, setDeletingGoalId] = useState<string | null>(null);
  const [justCompletedFeedback, setJustCompletedFeedback] = useState<string | null>(null);

  const activeGoals = state.goals.filter(g => g.status === GoalStatus.ATIVA);
  const completedGoals = state.goals.filter(g => g.status === GoalStatus.CONCLUIDA);
  const endedGoals = state.goals.filter(g => g.status === GoalStatus.ENCERRADA);
  const historyGoals = state.goals.filter(g => g.status !== GoalStatus.ATIVA);

  // Auto-close sidebar on mobile after tab change
  const navigate = (tab: 'metas' | 'progresso' | 'historico') => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  const handleCreateGoal = (data: Partial<Goal>) => {
    const newGoal: Goal = {
      id: Math.random().toString(36).substr(2, 9),
      title: data.title!,
      description: data.description,
      category: data.category!,
      deadline: data.deadline,
      effort: data.effort!,
      status: GoalStatus.ATIVA,
      createdAt: Date.now(),
    };
    onUpdateGoals([...state.goals, newGoal]);
    setShowGoalForm(false);
  };

  const handleEditGoal = (data: Partial<Goal>) => {
    const updated = state.goals.map(g => 
      g.id === editingGoal?.id ? { ...g, ...data } : g
    );
    onUpdateGoals(updated);
    setEditingGoal(null);
  };

  const handleCompleteGoal = (id: string) => {
    const goal = state.goals.find(g => g.id === id);
    if (!goal) return;

    const updated = state.goals.map(g => 
      g.id === id ? { ...g, status: GoalStatus.CONCLUIDA, completedAt: Date.now() } : g
    );
    onUpdateGoals(updated);
    onUpdateScore(EFFORT_POINTS[goal.effort]);
    
    setJustCompletedFeedback("Evolução Confirmada. Siga o Protocolo.");
    setTimeout(() => setJustCompletedFeedback(null), 3000);
  };

  const handleEndGoal = (id: string, reason: DeletionReason) => {
    const updated = state.goals.map(g => 
      g.id === id ? { ...g, status: GoalStatus.ENCERRADA, deletedAt: Date.now(), deletionReason: reason } : g
    );
    onUpdateGoals(updated);
    setDeletingGoalId(null);
  };

  const calculateStats = () => {
    const total = state.goals.length;
    const completed = completedGoals.length;
    const ended = endedGoals.length;
    const active = activeGoals.length;
    const rate = (total - active) > 0 ? Math.round((completed / (total - active)) * 100) : 0;
    
    let insight = "Continue sua jornada. A evolução é diária.";
    if (rate > 70) insight = "Nível de disciplina elevado. Mantenha o foco.";
    if (ended > completed && total > 2) insight = "Ajuste suas expectativas. Metas menores trazem mais constância.";

    return { total, completed, ended, active, rate, insight };
  };

  const stats = calculateStats();

  return (
    <div className="flex h-screen w-full bg-[#020202] overflow-hidden font-mono selection:bg-green-500 selection:text-black">
      
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#050505] border-b border-green-500/20 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-5 bg-green-500"></div>
          <h1 className="text-lg font-black text-green-500 tracking-tighter">NEXT MODE</h1>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-green-500 p-2 hover:bg-green-500/10 rounded-lg transition-colors"
        >
          {isSidebarOpen ? <Icons.X className="w-6 h-6" /> : <Icons.Target className="w-6 h-6" />}
        </button>
      </div>

      {/* Responsive Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 w-72 border-r border-green-500/20 flex flex-col bg-[#050505] h-full shadow-[20px_0_50px_rgba(0,0,0,0.5)] z-[60]
        transition-transform duration-300 transform lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-10 border-b border-green-950/30 hidden lg:block">
          <div className="flex items-center gap-3 mb-2">
             <div className="w-2 h-6 bg-green-500"></div>
             <h1 className="text-2xl font-black text-green-500 tracking-tighter uppercase">NEXT MODE</h1>
          </div>
          <p className="text-[9px] text-green-600 uppercase tracking-[0.4em] font-black opacity-80">New Ground Tech</p>
        </div>

        {/* Mobile Sidebar Padding */}
        <div className="lg:hidden h-20"></div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto no-scrollbar">
          <SidebarLink 
            active={activeTab === 'metas'} 
            onClick={() => navigate('metas')} 
            icon={<Icons.Target className="w-5 h-5" />} 
            label="Protocolos" 
          />
          <SidebarLink 
            active={activeTab === 'progresso'} 
            onClick={() => navigate('progresso')} 
            icon={<Icons.Zap className="w-5 h-5" />} 
            label="Estatísticas" 
          />
          <SidebarLink 
            active={activeTab === 'historico'} 
            onClick={() => navigate('historico')} 
            icon={<Icons.History className="w-5 h-5" />} 
            label="Log Global" 
          />
          <div className="py-4">
             <div className="h-[1px] bg-green-500/10 mx-6"></div>
          </div>
          <SidebarLink 
            active={showHelp} 
            onClick={() => { setShowHelp(true); setIsSidebarOpen(false); }} 
            icon={<Icons.Help className="w-5 h-5" />} 
            label="Suporte" 
          />
        </nav>

        <div className="p-6 sm:p-8 border-t border-green-500/20 bg-green-500/5">
          <div className="mb-6 bg-black/50 p-4 rounded-lg border border-green-500/10">
            <p className="text-[8px] text-green-600 uppercase mb-2 font-black tracking-[0.3em]">Score de Evolução</p>
            <div className="flex items-baseline gap-1">
               <p className="text-2xl sm:text-3xl font-black text-green-400 tabular-nums">{state.currentUser?.evolutionScore || 0}</p>
               <span className="text-green-800 text-[10px] font-bold">XP</span>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-4 text-[10px] font-black text-red-500 border border-red-900/30 hover:bg-red-500 hover:text-black transition-all rounded group"
          >
            <Icons.LogOut className="w-4 h-4" />
            ENCERRAR SESSÃO
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Container */}
      <main className="flex-1 flex flex-col h-full bg-[#020202] relative pt-16 lg:pt-0">
        <div className="flex-1 overflow-y-auto px-6 sm:px-10 md:px-16 py-10 sm:py-16 scrollbar-hide">
          <div className="max-w-6xl mx-auto">
            
            {activeTab === 'metas' && (
              <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-12 sm:mb-16">
                  <div>
                    <div className="text-green-500 text-[10px] font-black tracking-[0.5em] uppercase mb-4">Módulo de Ação</div>
                    <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight">Metas Ativas</h2>
                    <p className="text-sm text-green-700 font-sans max-w-md">Gerenciamento de objetivos estratégicos e operacionais.</p>
                  </div>
                  <button 
                    onClick={() => setShowGoalForm(true)}
                    className="bg-green-500 hover:bg-green-400 text-black px-8 sm:px-10 py-4 rounded text-[10px] font-black tracking-[0.3em] transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(34,197,94,0.15)] w-full sm:w-auto"
                  >
                    <Icons.Plus className="w-5 h-5" />
                    NOVO FOCO
                  </button>
                </div>

                {activeGoals.length === 0 ? (
                  <div className="border border-green-500/10 rounded-xl py-20 sm:py-32 text-center bg-green-500/5 glow-green px-4">
                    <Icons.Target className="w-12 sm:w-16 h-12 sm:h-16 text-green-500/10 mx-auto mb-6" />
                    <p className="text-green-500/40 text-[10px] sm:text-[11px] font-black tracking-[0.4em] sm:tracking-[0.5em] uppercase">Status: Aguardando Inicialização</p>
                    <button 
                      onClick={() => setShowGoalForm(true)}
                      className="mt-8 text-green-500 text-[9px] font-bold border-b border-green-500/30 pb-1 hover:border-green-500 transition-all uppercase tracking-widest"
                    >
                      Clique para começar
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-10">
                    {activeGoals.map(goal => (
                      <div key={goal.id} className="group relative border border-green-500/20 bg-[#080808] p-6 sm:p-10 rounded-xl shadow-2xl hover:border-green-500/60 transition-all duration-500 glow-green">
                        <div className="absolute top-0 right-0 p-4">
                           <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        </div>

                        <div className="flex justify-between items-start mb-6 sm:mb-8">
                          <span className="text-[8px] sm:text-[9px] text-green-500 font-black uppercase tracking-[0.3em] bg-green-500/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-green-500/20">{goal.category}</span>
                          <div className="flex gap-4 sm:gap-6 lg:opacity-0 group-hover:opacity-100 transition-all">
                            <button onClick={() => setEditingGoal(goal)} className="text-green-700 hover:text-green-400"><Icons.Edit className="w-4 sm:w-5 h-4 sm:h-5"/></button>
                            <button onClick={() => setDeletingGoalId(goal.id)} className="text-green-700 hover:text-red-500"><Icons.Trash className="w-4 sm:w-5 h-4 sm:h-5"/></button>
                          </div>
                        </div>

                        <h3 className="text-white text-xl sm:text-2xl font-black mb-3 sm:mb-4 group-hover:text-green-400 transition-colors">{goal.title}</h3>
                        
                        {goal.description ? (
                          <p className="text-xs text-green-700/80 mb-6 sm:mb-10 leading-relaxed font-sans line-clamp-2 sm:line-clamp-3">{goal.description}</p>
                        ) : (
                          <div className="h-10 sm:h-16"></div>
                        )}

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-auto pt-6 sm:pt-8 border-t border-green-500/10 gap-4">
                          <div className="flex flex-col">
                             <span className="text-[8px] text-green-900 font-black uppercase tracking-[0.3em]">Demanda</span>
                             <span className="text-[10px] sm:text-[11px] text-green-500 font-black uppercase">{goal.effort}</span>
                          </div>
                          <button 
                            onClick={() => handleCompleteGoal(goal.id)}
                            className="bg-transparent border border-green-500/40 text-green-500 text-[10px] font-black px-6 sm:px-8 py-3 rounded-lg hover:bg-green-500 hover:text-black transition-all transform hover:translate-y-[-4px] shadow-lg uppercase"
                          >
                            CONCLUIR PROTOCOLO
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {activeTab === 'progresso' && (
              <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-12 sm:space-y-16">
                <div className="mb-12 sm:mb-16">
                  <div className="text-green-500 text-[10px] font-black tracking-[0.5em] uppercase mb-4">Módulo Analítico</div>
                  <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight">Performance Global</h2>
                  <p className="text-sm text-green-700 font-sans max-w-md">Métricas de rendimento e auditoria de constância.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
                  <StatBox label="Total Criadas" value={stats.total} />
                  <StatBox label="Confirmadas" value={stats.completed} />
                  <StatBox label="Encerradas" value={stats.ended} />
                  <StatBox label="Taxa de Foco" value={`${stats.rate}%`} />
                </div>

                <div className="border border-green-500/20 p-8 sm:p-12 rounded-2xl bg-green-500/5 relative overflow-hidden group glow-green">
                  <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-green-500/5 blur-[80px] sm:blur-[120px]"></div>
                  <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
                    <div className="p-2 sm:p-3 bg-green-500/20 rounded-xl">
                      <Icons.Zap className="w-5 sm:w-6 h-5 sm:h-6 text-green-400" />
                    </div>
                    <h3 className="text-[10px] sm:text-[11px] text-green-400 uppercase tracking-[0.3em] sm:tracking-[0.4em] font-black">Diagnóstico da Nova Era</h3>
                  </div>
                  <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-3xl font-sans font-medium">{stats.insight}</p>
                </div>
              </section>
            )}

            {activeTab === 'historico' && (
              <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="mb-12 sm:mb-16">
                  <div className="text-green-500 text-[10px] font-black tracking-[0.5em] uppercase mb-4">Registro Histórico</div>
                  <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight">Log de Operações</h2>
                  <p className="text-sm text-green-700 font-sans max-w-md">Arquivo cronológico de todas as diretrizes finalizadas.</p>
                </div>

                {historyGoals.length === 0 ? (
                  <div className="text-center py-20 sm:py-32 border border-green-500/10 bg-black/40 rounded-xl px-4">
                    <p className="text-green-900 text-[10px] sm:text-[11px] font-black tracking-[0.4em] uppercase">Nenhum registro detectado.</p>
                  </div>
                ) : (
                  <div className="space-y-4 sm:space-y-6">
                    {historyGoals.sort((a,b) => (b.completedAt || b.deletedAt || 0) - (a.completedAt || a.deletedAt || 0)).map(goal => (
                      <div key={goal.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 sm:p-8 border border-green-500/10 rounded-xl bg-[#080808] hover:border-green-500/40 transition-all group glow-green gap-6">
                        <div className="flex gap-4 sm:gap-8 items-center">
                          <div className={`w-1 sm:w-1.5 h-10 sm:h-12 rounded-full flex-shrink-0 ${goal.status === GoalStatus.CONCLUIDA ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-800'}`}></div>
                          <div>
                            <div className="flex flex-wrap items-center gap-3 sm:gap-5 mb-2">
                              <span className="text-white font-black text-base sm:text-lg tracking-tight leading-tight">{goal.title}</span>
                              <span className={`text-[8px] font-black px-2 sm:px-3 py-1 rounded-full tracking-[0.2em] uppercase ${goal.status === GoalStatus.CONCLUIDA ? 'bg-green-500 text-black' : 'bg-red-900 text-white'}`}>
                                {goal.status}
                              </span>
                            </div>
                            <p className="text-[9px] sm:text-[10px] text-green-700 font-black uppercase tracking-[0.3em]">{goal.category} • {new Date(goal.completedAt || goal.deletedAt || 0).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-left sm:text-right flex-shrink-0 border-t sm:border-t-0 pt-4 sm:pt-0 border-green-500/10">
                          {goal.status === GoalStatus.CONCLUIDA ? (
                            <span className="text-green-400 font-black text-lg sm:text-xl tabular-nums">+{EFFORT_POINTS[goal.effort]} XP</span>
                          ) : (
                            <span className="text-red-900 italic text-[10px] sm:text-[11px] font-bold uppercase tracking-widest leading-relaxed block sm:inline">{goal.deletionReason}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

          </div>
        </div>
      </main>

      {/* Modals & Overlay Components (Ensure scrollability if content exceeds screen) */}
      {(showGoalForm || editingGoal) && (
        <GoalForm 
          goal={editingGoal || undefined}
          onClose={() => { setShowGoalForm(false); setEditingGoal(null); }}
          onSave={editingGoal ? handleEditGoal : handleCreateGoal}
        />
      )}

      {deletingGoalId && (
        <DeleteModal 
          onClose={() => setDeletingGoalId(null)}
          onConfirm={(reason) => handleEndGoal(deletingGoalId, reason)}
        />
      )}

      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}

      {!state.currentUser?.hasSeenWelcome && state.goals.length === 1 && (
        <WelcomeModal onDismiss={onWelcomeSeen} />
      )}

      {justCompletedFeedback && (
        <div className="fixed bottom-6 sm:bottom-12 right-6 sm:right-12 bg-green-500 text-black px-6 sm:px-12 py-4 sm:py-5 rounded-xl font-black text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.3em] shadow-[0_0_50px_rgba(34,197,94,0.3)] animate-in slide-in-from-right-10 duration-500 flex items-center gap-3 sm:gap-4 z-[100]">
          <Icons.Check className="w-4 sm:w-5 h-4 sm:h-5" />
          {justCompletedFeedback.toUpperCase()}
        </div>
      )}
    </div>
  );
};

const SidebarLink: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-5 px-6 py-4 sm:py-5 rounded-xl text-[10px] transition-all duration-400 transform group ${
      active ? 'bg-green-500 text-black shadow-[0_0_25px_rgba(34,197,94,0.2)]' : 'text-green-800 hover:text-green-500 hover:bg-green-500/5'
    }`}
  >
    <div className={active ? 'text-black' : 'text-green-900 group-hover:text-green-500 transition-colors'}>{icon}</div>
    <span className="font-black tracking-[0.3em] uppercase whitespace-nowrap">{label}</span>
  </button>
);

const StatBox: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="border border-green-500/10 p-8 sm:p-10 rounded-2xl bg-[#080808] group hover:border-green-500/40 transition-all shadow-2xl glow-green">
    <p className="text-[9px] sm:text-[10px] text-green-900 uppercase tracking-[0.3em] mb-4 font-black group-hover:text-green-600 transition-colors">{label}</p>
    <p className="text-3xl sm:text-4xl font-black text-green-500 tabular-nums">{value}</p>
  </div>
);

export default Dashboard;


import React, { useState } from 'react';
import { getUser, saveUser } from '../services/storage';
import { User } from '../types';
import { Icons } from '../constants';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || password.length === 0) {
      setError('Preencha todos os campos');
      return;
    }

    if (password.length > 4 || !/^\d+$/.test(password)) {
      setError('Senha deve ser numérica e ter até 4 dígitos');
      return;
    }

    const existingUser = getUser(username);

    if (existingUser) {
      if (existingUser.passwordHash === password) {
        onLogin(existingUser);
      } else {
        setError('Senha incorreta');
      }
    } else {
      const newUser: User = {
        username,
        passwordHash: password,
        evolutionScore: 0,
        hasSeenWelcome: false
      };
      saveUser(newUser);
      onLogin(newUser);
    }
  };

  return (
    <div className="h-full w-full bg-[#020202] flex flex-col items-center justify-center p-4 sm:p-6 selection:bg-green-500 selection:text-black overflow-y-auto no-scrollbar">
      <div className="w-full max-w-md border border-green-500/30 bg-[#050505] p-8 sm:p-12 rounded shadow-2xl relative overflow-hidden glow-green-strong my-auto">
        <div className="absolute top-0 left-0 w-full h-[4px] bg-green-500"></div>
        
        <div className="mb-8 sm:mb-12 text-center">
          <div className="flex justify-center mb-4">
             <div className="w-12 h-1 bg-green-500/20 rounded-full flex justify-center items-center">
                <div className="w-4 h-full bg-green-500"></div>
             </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-mono text-green-500 mb-2 tracking-tighter uppercase">NEXT MODE</h1>
          <p className="text-green-600 font-mono text-[9px] sm:text-[10px] font-black tracking-[0.4em] sm:tracking-[0.5em] uppercase">New Ground Tech</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-10">
          <div className="space-y-6">
            <div className="relative group">
              <label className="block text-green-500 text-[9px] font-black font-mono mb-2 uppercase tracking-[0.4em]">Protocolo de Identidade</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black border border-green-900/40 rounded p-3 sm:p-4 text-sm sm:text-base text-white focus:outline-none focus:border-green-500 transition-all font-sans placeholder:text-green-900/20"
                placeholder="USUÁRIO"
              />
              <div className="absolute right-4 top-[2.2rem] sm:top-[2.4rem] text-green-900 group-focus-within:text-green-500 transition-colors hidden sm:block">
                <Icons.Target className="w-4 h-4" />
              </div>
            </div>

            <div className="relative group">
              <label className="block text-green-500 text-[9px] font-black font-mono mb-2 uppercase tracking-[0.4em]">Chave de Acesso</label>
              <input 
                type="password" 
                value={password}
                maxLength={4}
                onChange={(e) => setPassword(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-black border border-green-900/40 rounded p-3 sm:p-4 text-white focus:outline-none focus:border-green-500 transition-all font-mono tracking-[1em] sm:tracking-[1.2em] placeholder:text-green-900/20 text-sm sm:text-base"
                placeholder="••••"
              />
              <div className="absolute right-4 top-[2.2rem] sm:top-[2.4rem] text-green-900 group-focus-within:text-green-500 transition-colors hidden sm:block">
                <Icons.Zap className="w-4 h-4" />
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 border border-red-500/30 bg-red-950/10 text-red-500 text-[10px] font-black font-mono uppercase tracking-widest text-center animate-pulse">
              ERRO: {error.toUpperCase()}
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-green-600 hover:bg-green-400 text-black font-black py-4 sm:py-5 px-4 rounded transition-all duration-500 transform active:scale-95 flex items-center justify-center gap-3 group shadow-[0_0_30px_rgba(34,197,94,0.2)]"
          >
            <span className="tracking-[0.3em] sm:tracking-[0.4em] text-[9px] sm:text-[10px]">INICIALIZAR SISTEMA</span>
            <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </form>

        <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-green-900/10 text-center">
          <p className="text-green-900 text-[8px] sm:text-[9px] font-black font-mono leading-loose tracking-widest uppercase">
            Evolution Protocol v3.0<br/>
            Secure Hub • Next-Gen Development
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

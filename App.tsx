
import React, { useState, useEffect, useCallback } from 'react';
import { User, Goal, AppState } from './types';
import { getUser, getGoals, saveUser, saveGoals } from './services/storage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [session, setSession] = useState<AppState>({
    currentUser: null,
    goals: []
  });

  const handleLogin = (user: User) => {
    const goals = getGoals(user.username);
    setSession({ currentUser: user, goals });
  };

  const handleLogout = () => {
    setSession({ currentUser: null, goals: [] });
  };

  const updateGoals = useCallback((newGoals: Goal[]) => {
    if (session.currentUser) {
      setSession(prev => ({ ...prev, goals: newGoals }));
      saveGoals(session.currentUser.username, newGoals);
    }
  }, [session.currentUser]);

  const updateScore = useCallback((points: number) => {
    if (session.currentUser) {
      const updatedUser = {
        ...session.currentUser,
        evolutionScore: (session.currentUser.evolutionScore || 0) + points
      };
      setSession(prev => ({ ...prev, currentUser: updatedUser }));
      saveUser(updatedUser);
    }
  }, [session.currentUser]);

  const markWelcomeSeen = useCallback(() => {
    if (session.currentUser) {
      const updatedUser = { ...session.currentUser, hasSeenWelcome: true };
      setSession(prev => ({ ...prev, currentUser: updatedUser }));
      saveUser(updatedUser);
    }
  }, [session.currentUser]);

  // Handle system close - simple state clearing
  useEffect(() => {
    const handleBeforeUnload = () => {
      // In a real browser env, React state is cleared on refresh/close
      // This is a placeholder for session management if using tokens
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  if (!session.currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Dashboard 
      state={session} 
      onLogout={handleLogout} 
      onUpdateGoals={updateGoals}
      onUpdateScore={updateScore}
      onWelcomeSeen={markWelcomeSeen}
    />
  );
};

export default App;

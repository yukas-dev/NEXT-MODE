
import { User, Goal } from '../types';

const USERS_KEY = 'nextmode_users';
const GOALS_PREFIX = 'nextmode_goals_';

export const saveUser = (user: User) => {
  const users = getUsers();
  users[user.username] = user;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getUsers = (): Record<string, User> => {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : {};
};

export const getUser = (username: string): User | null => {
  return getUsers()[username] || null;
};

export const saveGoals = (username: string, goals: Goal[]) => {
  localStorage.setItem(`${GOALS_PREFIX}${username}`, JSON.stringify(goals));
};

export const getGoals = (username: string): Goal[] => {
  const data = localStorage.getItem(`${GOALS_PREFIX}${username}`);
  return data ? JSON.parse(data) : [];
};

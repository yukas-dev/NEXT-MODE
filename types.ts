
export enum Category {
  VIDA = 'Vida',
  ESTUDOS = 'Estudos',
  FUTURO = 'Futuro',
  DISCIPLINA = 'Disciplina'
}

export enum EffortLevel {
  BAIXO = 'baixo',
  MEDIO = 'médio',
  ALTO = 'alto'
}

export enum GoalStatus {
  ATIVA = 'ativa',
  CONCLUIDA = 'concluída',
  ENCERRADA = 'encerrada'
}

export enum DeletionReason {
  NAO_PRIORIDADE = 'Não era prioridade',
  FALTA_TEMPO = 'Falta de tempo',
  MAL_DEFINIDA = 'Meta mal definida'
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  category: Category;
  deadline?: string;
  effort: EffortLevel;
  status: GoalStatus;
  createdAt: number;
  completedAt?: number;
  deletedAt?: number;
  deletionReason?: DeletionReason;
}

export interface User {
  username: string;
  passwordHash: string;
  evolutionScore: number;
  hasSeenWelcome: boolean;
}

export interface AppState {
  currentUser: User | null;
  goals: Goal[];
}

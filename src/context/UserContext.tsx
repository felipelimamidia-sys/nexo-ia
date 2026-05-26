import { createContext, useContext, useState, ReactNode } from 'react';

export interface UserData {
  name: string;
  goals: string[];
  professionalArea: string;
  skillLevel: string;
  timePerDay: string;
  learningStyle: string;
  difficulties: string[];
  mainObjective: string;
  altitude: number;
  flights: number;
  streak: number;
  xp: number;
  completedLessons: string[];
  currentCourses: string[];
}

interface UserContextType {
  user: UserData | null;
  setUser: (user: UserData) => void;
  updateUser: (updates: Partial<UserData>) => void;
  addXP: (amount: number) => void;
  incrementFlights: () => void;
  incrementStreak: () => void;
  resetStreak: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(() => {
    const saved = localStorage.getItem('nexo_user');
    return saved ? JSON.parse(saved) : null;
  });

  const updateUser = (updates: Partial<UserData>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      localStorage.setItem('nexo_user', JSON.stringify(updated));
      return updated;
    });
  };

  const addXP = (amount: number) => {
    setUser((prev) => {
      if (!prev) return prev;
      const newXP = prev.xp + amount;
      const newAltitude = Math.floor(newXP / 1000) + 1;
      const updated = { ...prev, xp: newXP, altitude: newAltitude };
      localStorage.setItem('nexo_user', JSON.stringify(updated));
      return updated;
    });
  };

  const incrementFlights = () => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, flights: prev.flights + 1 };
      localStorage.setItem('nexo_user', JSON.stringify(updated));
      return updated;
    });
  };

  const incrementStreak = () => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, streak: prev.streak + 1 };
      localStorage.setItem('nexo_user', JSON.stringify(updated));
      return updated;
    });
  };

  const resetStreak = () => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, streak: 0 };
      localStorage.setItem('nexo_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, updateUser, addXP, incrementFlights, incrementStreak, resetStreak }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

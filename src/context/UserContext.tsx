import { createContext, useContext, useState, ReactNode } from "react";
import { UserData } from "../types/onboarding";

interface UserContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  setUser: (user: UserData | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  // In a real app, you would check localStorage or a token to restore the session
  const [user, setUser] = useState<UserData | null>(null);

  const isAuthenticated = !!user;
  const isOnboarded = !!user?.isOnboarded;

  const logout = () => {
    // In a real app, you would clear tokens, call logout API, etc.
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated, isOnboarded, setUser, logout }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

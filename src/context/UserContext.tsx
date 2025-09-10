// useUser.tsx
import { createContext, useState, type ReactNode, useEffect } from "react";

export interface UserContextType {
  email: string;
  setEmail: (email: string) => void;
  clearUser: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmailState] = useState<string>("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) setEmailState(storedEmail);
  }, []);

  const setEmail = (email: string) => {
    setEmailState(email);
    localStorage.setItem("userEmail", email);
  };

  const clearUser = () => {
    setEmailState("");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ email, setEmail, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};



// useUser.tsx
import { createContext, useState, type ReactNode, useEffect } from "react";

export interface UserContextType {
  email: string;
  name: string;
  setUser: (email: string, name: string) => void;
  clearUser: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedName = localStorage.getItem("userName");
    if (storedEmail) setEmail(storedEmail);
    if (storedName) setName(storedName);
  }, []);

  const setUser = (email: string, name: string) => {
    setEmail(email);
    setName(name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userName", name);
  };

  const clearUser = () => {
    setEmail("");
    setName("");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ email, name, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

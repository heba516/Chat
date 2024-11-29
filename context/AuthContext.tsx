"use client";

import React, { createContext, ReactNode, useState, useContext } from "react";
import { Ichat } from "@/interfaces";

interface AuthContextType {
  user: Ichat;
  setUser: (data: Ichat) => void;
  regInfo: { fullName: string; id: string };
  setRegInfo: (data: { fullName: string; id: string }) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<Ichat>({ fullName: "" });
  const [regInfo, setRegInfo] = useState<{ fullName: string; id: string }>({
    fullName: "",
    id: "",
  });

  return (
    <AuthContext.Provider value={{ user, setUser, regInfo, setRegInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};

export default AuthContextProvider;

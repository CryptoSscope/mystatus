"use client"; // Este contexto será usado em componentes/client side

import { createContext, useContext, useState, ReactNode } from "react";
import type { Usuario } from "@/types/usuario";

// Interface que define quais dados e funções o contexto expõe
type AuthContextData = {
  usuarioAtual: Usuario | null;              // usuário logado (null = anônimo)
  loginComoAnonimo: () => void;              // força estado anônimo
  loginFakeBasico: (email: string) => void;  // login fake como usuário básico
  logout: () => void;                        // limpa qualquer login
};

// Criação do contexto com valor inicial undefined (forçamos uso via provider)
const AuthContext = createContext<AuthContextData | undefined>(undefined);

// Componente provider que vai envolver a aplicação
export function AuthProvider({ children }: { children: ReactNode }) {
  // Estado interno para armazenar o usuário atual
  const [usuarioAtual, setUsuarioAtual] = useState<Usuario | null>(null);

  // Define explicitamente o usuário como ANÔNIMO
  const loginComoAnonimo = () => {
    setUsuarioAtual(null); // null representa o usuário anônimo
  };

  // Login fake como usuário BÁSICO
  const loginFakeBasico = (email: string) => {
    const usuarioBasico: Usuario = {
      id: "fake-basico-1", // em produção, isso viria do backend
      email,
      nivel: "BASICO",
      nome: "Usuário Básico",
    };

    setUsuarioAtual(usuarioBasico);
  };

  // Função de logout (volta para anônimo)
  const logout = () => {
    setUsuarioAtual(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuarioAtual,
        loginComoAnonimo,
        loginFakeBasico,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook de conveniência para usar o contexto em qualquer componente
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }

  return context;
}

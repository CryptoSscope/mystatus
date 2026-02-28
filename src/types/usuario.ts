// Níveis de acesso possíveis no sistema
export type NivelAcesso = "ANONIMO" | "BASICO" | "VERIFICADO" | "PREMIUM";

// Estrutura básica de um usuário autenticado
export type Usuario = {
  id: string;          // identificador interno do usuário (pode ser um UUID)
  email: string;       // e-mail utilizado no cadastro/login
  nivel: NivelAcesso;  // nível de acesso do usuário
  nome?: string;       // nome opcional para exibição
  discord?: string;    // handle do Discord (para VERIFICADO/PREMIUM)
  walletSui?: string;  // endereço da wallet SUI (para PREMIUM)
  hasNftPremium?: boolean; // indica se o usuário já possui o NFT premium
};

// src/utils/validacoes.js

export const validarEmailEscolar = (email) => {
    // Exemplo: só aceita emails que terminam com @escola.com ou @etec.sp.gov.br
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  export const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };
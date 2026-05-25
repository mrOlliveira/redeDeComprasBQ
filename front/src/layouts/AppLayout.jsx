import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function AppLayout() {
  // Verifica se o usuário está logado
  const usuarioLogado = localStorage.getItem('usuarioLogado');

  // Se não estiver logado, redireciona imediatamente para a tela de login "/"
  if (!usuarioLogado) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="app-container">
      {/* Se tiver um Menu ou Header global no futuro, ele entra aqui */}
      {/* <Menu / > */}
      
      <main className="conteudo-principal">
        {/* Renderiza as páginas filhas (Home, etc.) */}
        <Outlet />
      </main>
    </div>
  );
}
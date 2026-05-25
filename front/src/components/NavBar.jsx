import React from "react";
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar({ onMenuClick }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    navigate('/');
  };

  return (
    <nav className="h-16 w-full flex items-center justify-between px-6 bg-[#111827]/80 backdrop-blur-md border-b border-cyan-500/30 sticky top-0 z-50 shadow-lg">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="bg-none border-none text-cyan-400 text-2xl cursor-pointer hover:text-cyan-300 transition-colors p-1"
        >
          ☰
        </button>

        <Link to="/home" className="text-white no-underline font-bold tracking-wider">
          <h2 className="text-white text-xl m-0 font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            RedeCompras
          </h2>
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="text-slate-400 hover:text-rose-400 font-semibold text-sm no-underline bg-transparent border-none cursor-pointer transition-colors"
      >
        Sair
      </button>
    </nav>
  );
}
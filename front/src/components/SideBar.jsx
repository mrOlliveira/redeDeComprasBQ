import React from 'react';
import { Link } from 'react-router-dom';

export default function SideBar({ isOpen, onClose }) {
  return (
    <>
      {/* Backdrop de fundo escuro quando o menu estiver aberto no mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div className={`fixed top-0 left-0 h-screen w-64 bg-[#0b0f19]/95 backdrop-blur-xl text-white pt-24 px-6 box-border shadow-[4px_0_25px_rgba(0,0,0,0.5)] flex flex-col gap-6 transition-all duration-300 z-40 border-r border-white/5 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        <div>
          <h3 className="text-[11px] text-cyan-400 font-bold tracking-widest mb-3 uppercase">
            Admin
          </h3>
          <Link 
            to="/admin" 
            className="text-sm text-slate-400 hover:text-cyan-400 no-underline font-medium transition-colors flex items-center gap-2"
            onClick={onClose}
          >
            <span>👥</span> Gerenciar Usuários
          </Link>
        </div>
      </div>
    </>
  );
}
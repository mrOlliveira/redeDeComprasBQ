import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Login from './screens/Login/index';
import Home from './screens/home/index';
import Checkout from './screens/checkout/index';
import HomeAdmin from './screens/HomeAdmin/index';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';

function LayoutComComponentes() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col font-sans">
      {/* NavBar Fixa no Topo */}
      <NavBar onMenuClick={() => setMenuAberto(!menuAberto)} />
      
      {/* SideBar Lateral Deslizante */}
      <SideBar isOpen={menuAberto} onClose={() => setMenuAberto(false)} />
      
      {/* Área de conteúdo que recua dinamicamente caso o menu esteja aberto no desktop */}
      <main className={`flex-1 p-6 transition-all duration-300 ${menuAberto ? 'lg:pl-72' : 'lg:pl-6'}`}>
        <Outlet />
      </main>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Tela de Login isolada sem barras de navegação */}
        <Route path="/" element={<Login />} />

        {/* Rotas Privadas e Internas do Sistema */}
        <Route element={<LayoutComComponentes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/HomeAdmin" element={<HomeAdmin />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
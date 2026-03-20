//# Configuração do react-router-dom
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importando as páginas conforme sua estrutura de pastas
import Home from './pages/home/index';
import DetailsScreen from './pages/detailsScreen/index';

// DICA: Como você tem Admin e Aluno, vamos criar um componente simples 
// para simular a proteção de rotas futuramente.
const Login = () => <div style={{color: 'white', padding: '50px'}}>Página de Login (Em breve)</div>;

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rota Inicial (Vitrine de Uniformes e Armários) */}
                <Route path="/" element={<Home />} />

                {/* Rota para ver detalhes de um item específico (ex: /details/123) */}
                <Route path="/details/:id" element={<DetailsScreen />} />

                {/* Rota de Login */}
                <Route path="/login" element={<Login />} />

                {/* Se o usuário digitar qualquer coisa errada, volta para a Home */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}
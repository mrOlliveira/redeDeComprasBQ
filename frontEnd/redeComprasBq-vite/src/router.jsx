import React, { useState } from 'react'; // - Importamos o useState para criar o controle "aberto/fechado"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/index';
import DetailsScreen from './pages/detailsScreen/index';
import NavBar from './components/NavBar'; 
import SideBar from './components/SideBar';
import Login from './pages/LoginScreen/index';

export default function AppRoutes() {
    const [isSideBarOpen, setIsSideBarOpen] = useState(true); //
    const toggleSideBar = () => setIsSideBarOpen(!isSideBarOpen); //

    return (
        <BrowserRouter>
            <NavBar onMenuClick={toggleSideBar} /> {/* */}

            <div style={{ display: 'flex' }}>
                
                <SideBar isOpen={isSideBarOpen} /> {/* */}
                <main style={{
                    flexGrow: 1, //
                    marginLeft: isSideBarOpen ? '200px' : '0',
                    transition: 'margin-left 0.3s ease',
                    minHeight: 'calc(100vh - 60px)', 
                    backgroundColor: '#0a0e17' 
                }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/details/:id" element={<DetailsScreen />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}
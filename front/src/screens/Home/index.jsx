import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lojaService } from '../../services/lojaServices';

export default function Home() {
  const navigate = useNavigate();
  const [armarios, setArmarios] = useState([]);
  const [corredores, setCorredores] = useState([]);
  const [corredorAtivo, setCorredorAtivo] = useState(null);
  const [armarioSelecionado, setArmarioSelecionado] = useState(null);
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filtro Selecionável
  const [apenasDisponiveis, setApenasDisponiveis] = useState(false);

  // Paginação para matriz 5x6 (30 itens por página)
  const [paginaAtual, setPaginaAtual] = useState(1);
  const armariosPorPagina = 30;

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        const dados = await lojaService.buscarTodos();
        setArmarios(dados);

        const listaCorredores = [...new Set(dados.map(item => item.nomeCorredor))].filter(Boolean);
        setCorredores(listaCorredores);

        // Define o primeiro corredor da lista como ativo assim que os dados carregam
        if (listaCorredores.length > 0) {
          setCorredorAtivo(listaCorredores[0]);
        }
      } catch (err) {
        setErro("Não foi possível carregar os armários.");
      } finally {
        setLoading(false);
      }
    };
    carregarDados();
  }, []);

  const mudarCorredor = (corredor) => {
    setCorredorAtivo(corredor);
    setArmarioSelecionado(null);
    setPaginaAtual(1);
  };

  const alternarFiltro = (e) => {
    setApenasDisponiveis(e.target.checked);
    setArmarioSelecionado(null);
    setPaginaAtual(1);
  };

  // --- FILTRAGEM SEGURA (Garante que se corredorAtivo for null, não quebra o código) ---
  let armariosFiltrados = corredorAtivo 
    ? armarios.filter(item => item.nomeCorredor === corredorAtivo)
    : [];

  if (apenasDisponiveis) {
    armariosFiltrados = armariosFiltrados.filter(item => item.status === 0);
  }

  // --- PAGINAÇÃO (MATRIZ 5x6) ---
  const totalPaginas = Math.ceil(armariosFiltrados.length / armariosPorPagina) || 1;
  const indiceUltimo = paginaAtual * armariosPorPagina;
  const indicePrimeiro = indiceUltimo - armariosPorPagina;
  const armariosExibidos = armariosFiltrados.slice(indicePrimeiro, indiceUltimo);

  const handleSelecionarArmario = (armario) => {
    if (armario.status !== 0) return;
    if (armarioSelecionado?.id === armario.id) {
      setArmarioSelecionado(null);
    } else {
      setArmarioSelecionado(armario);
    }
  };

  const handleIrParaCheckout = () => {
    if (armarioSelecionado) {
      navigate('/checkout', { state: { armario: armarioSelecionado } });
    }
  };

  const obterEstiloArmario = (item) => {
    const isSelected = armarioSelecionado?.id === item.id;
    
    let baseStyle = {
      aspectRatio: '1/1',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    };

    if (isSelected) {
      return { ...baseStyle, border: '2px solid #00d2ff', backgroundColor: 'rgba(0, 210, 255, 0.2)', color: '#00d2ff' };
    }

    switch (item.status) {
      case 0: // Disponível
        return { ...baseStyle, backgroundColor: 'rgba(46, 204, 113, 0.1)', color: '#2ecc71', border: '1px solid rgba(46, 204, 113, 0.3)' };
      case 1: // Ocupado
        return { ...baseStyle, backgroundColor: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c', opacity: 0.5, cursor: 'not-allowed' };
      case 2: // Manutenção
        return { ...baseStyle, backgroundColor: 'rgba(241, 196, 15, 0.1)', color: '#f1c40f', opacity: 0.4, cursor: 'not-allowed' };
      default:
        return baseStyle;
    }
  };

  if (loading) return <div style={{ color: '#cbd5e1', textAlign: 'center', padding: '40px' }}>Carregando armários...</div>;
  if (erro) return <div style={{ color: '#e74c3c', textAlign: 'center', padding: '40px' }}>{erro}</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', color: '#ffffff', fontFamily: 'sans-serif', boxSizing: 'border-box' }}>
      
      {/* Cabeçalho e Seleção de Corredores */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px', marginBottom: '15px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '24px' }}>Mapa de Ocupação</h2>
          <p style={{ margin: '5px 0 0 0', color: '#8fa0dd', fontSize: '13px' }}>Selecione o corredor para gerenciar os armários</p>
        </div>

        {/* Abas */}
        <div style={{ display: 'flex', gap: '8px', backgroundColor: '#1c243d', padding: '6px', borderRadius: '8px' }}>
          {corredores.map((corredor) => (
            <button
              key={corredor}
              onClick={() => mudarCorredor(corredor)}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                backgroundColor: corredorAtivo === corredor ? '#00d2ff' : 'transparent',
                color: corredorAtivo === corredor ? '#111524' : '#cbd5e1',
                transition: 'all 0.2s'
              }}
            >
              {corredor}
            </button>
          ))}
        </div>
      </div>

      {/* Barra de Filtros */}
      <div style={{ backgroundColor: '#1c243d', padding: '12px 20px', borderRadius: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input 
          type="checkbox" 
          id="disponiveis"
          checked={apenasDisponiveis}
          onChange={alternarFiltro}
          style={{ width: '16px', height: '16px', cursor: 'pointer' }}
        />
        <label htmlFor="disponiveis" style={{ fontSize: '14px', color: '#cbd5e1', cursor: 'pointer' }}>
          Exibir apenas armários disponíveis
        </label>
      </div>

      {/* Layout de Conteúdo principal */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', alignItems: 'start' }}>
        
        {/* Painel da Matriz */}
        <div style={{ backgroundColor: '#1c243d', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(5, 1fr)', 
            gap: '12px',
            maxWidth: '450px',
            margin: '0 auto',
            width: '100%'
          }}>
            {armariosExibidos.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelecionarArmario(item)}
                disabled={item.status !== 0}
                style={obterEstiloArmario(item)}
              >
                <span style={{ fontSize: '10px', opacity: 0.5, fontWeight: 'normal' }}>Nº</span>
                {item.posicao || item.id}
                {item.preco && <span style={{ fontSize: '10px', color: '#2ecc71', marginTop: '2px' }}>R${item.preco}</span>}
              </button>
            ))}
          </div>

          {/* Paginação com as setas */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '15px' }}>
            <span style={{ fontSize: '13px', color: '#8fa0dd' }}>
              Página <strong style={{ color: '#fff' }}>{paginaAtual}</strong> de <strong style={{ color: '#fff' }}>{totalPaginas}</strong>
            </span>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setPaginaAtual(p => Math.max(p - 1, 1))}
                disabled={paginaAtual === 1}
                style={{
                  width: '40px', height: '36px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: paginaAtual === 1 ? 0.3 : 1, pointerEvents: paginaAtual === 1 ? 'none' : 'auto'
                }}
              >
                ←
              </button>
              <button
                onClick={() => setPaginaAtual(p => Math.min(p + 1, totalPaginas))}
                disabled={paginaAtual === totalPaginas}
                style={{
                  width: '40px', height: '36px', backgroundColor: 'rgba(0, 210, 255, 0.1)', border: '1px solid rgba(0, 210, 255, 0.2)',
                  borderRadius: '6px', color: '#00d2ff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: paginaAtual === totalPaginas ? 0.3 : 1, pointerEvents: paginaAtual === totalPaginas ? 'none' : 'auto'
                }}
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Painel Informativo Lateral */}
        <aside style={{ backgroundColor: '#1c243d', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>Detalhes do Armário</h3>
          
          {armarioSelecionado ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#121829', padding: '12px', borderRadius: '8px', fontSize: '14px' }}>
                <span style={{ color: '#8fa0dd' }}>Posição:</span>
                <strong>{armarioSelecionado.posicao}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#121829', padding: '12px', borderRadius: '8px', fontSize: '14px' }}>
                <span style={{ color: '#8fa0dd' }}>Corredor:</span>
                <strong>{armarioSelecionado.nomeCorredor}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#121829', padding: '12px', borderRadius: '8px', fontSize: '14px' }}>
                <span style={{ color: '#8fa0dd' }}>Preço:</span>
                <strong style={{ color: '#2ecc71' }}>R$ {armarioSelecionado.preco?.toFixed(2)}</strong>
              </div>
              
              <button 
                onClick={handleIrParaCheckout}
                style={{
                  width: '100%', padding: '14px', backgroundColor: '#00d2ff', color: '#111524',
                  border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px'
                }}
              >
                Confirmar Alocação
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 10px', color: '#8fa0dd', fontSize: '14px' }}>
              Selecione um armário livre para visualizar as informações e realizar a reserva.
            </div>
          )}
        </aside>

      </div>
    </div>
  );
}
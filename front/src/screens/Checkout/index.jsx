import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { styles } from './styles';

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Recupera o armário enviado pela tela Home através do state do router
  const m_armario = location.state?.armario || {
    id: 1,
    posicao: "A1",
    nomeCorredor: "Corredor 1",
    preco: 100.00,
    descricao: "Armário de teste padrão"
  };

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('pix');
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState('');

  const handleFinalizarLocacao = (e) => {
    e.preventDefault();
    setErro('');

    if (!nome.trim() || !cpf.trim() || !telefone.trim()) {
      setErro('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setSucesso(true);
    
    setTimeout(() => {
      navigate('/home');
    }, 3000);
  };

  if (sucesso) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh', color: '#fff', fontFamily: 'sans-serif' }}>
        <div style={{ fontSize: '50px', color: '#2ecc71', marginBottom: '20px' }}>✓</div>
        <h2 style={{ margin: '0 0 10px 0' }}>Reserva Confirmada!</h2>
        <p style={{ color: '#8fa0dd', margin: 0 }}>Redirecionando para a página inicial...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '5px' }}>Finalizar Reserva</h2>
      <p style={{ color: '#8fa0dd', fontSize: '14px', marginBottom: '25px' }}>Preencha os seus dados abaixo para concluir a alocação do armário.</p>

      {erro && (
        <div style={{ backgroundColor: 'rgba(231, 76, 60, 0.1)', border: '1px solid #e74c3c', color: '#e74c3c', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
          {erro}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px', alignItems: 'start' }}>
        
        {/* Formulário de Identificação */}
        <form onSubmit={handleFinalizarLocacao} style={{ backgroundColor: '#1c243d', padding: '25px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>Dados do Cliente</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '14px', color: '#cbd5e1' }}>Nome Completo *</label>
            <input 
              type="text" 
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#121829', color: '#fff', fontSize: '14px', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '14px', color: '#cbd5e1' }}>CPF *</label>
              <input 
                type="text" 
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="000.000.000-00"
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#121829', color: '#fff', fontSize: '14px', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '14px', color: '#cbd5e1' }}>Telefone *</label>
              <input 
                type="tel" 
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="(19) 99999-9999"
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#121829', color: '#fff', fontSize: '14px', outline: 'none' }}
              />
            </div>
          </div>

          <h3 style={{ margin: '10px 0 0 0', fontSize: '18px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>Forma de Pagamento</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div 
              onClick={() => setFormaPagamento('pix')}
              style={{ padding: '15px', borderRadius: '8px', border: formaPagamento === 'pix' ? '2px solid #00d2ff' : '1px solid rgba(255,255,255,0.1)', backgroundColor: '#121829', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
            >
              <input type="radio" checked={formaPagamento === 'pix'} readOnly style={{ cursor: 'pointer' }} />
              <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Pix</span>
            </div>

            <div 
              onClick={() => setFormaPagamento('cartao')}
              style={{ padding: '15px', borderRadius: '8px', border: formaPagamento === 'cartao' ? '2px solid #00d2ff' : '1px solid rgba(255,255,255,0.1)', backgroundColor: '#121829', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
            >
              <input type="radio" checked={formaPagamento === 'cartao'} readOnly style={{ cursor: 'pointer' }} />
              <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Cartão de Crédito</span>
            </div>
          </div>

          <button 
            type="submit" 
            style={{ width: '100%', padding: '14px', backgroundColor: '#2ecc71', color: '#111524', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '10px', transition: 'background 0.2s' }}
          >
            Finalizar e Confirmar Reserva
          </button>
        </form>

        {/* Lateral de Resumo da Reserva */}
        <aside style={{ backgroundColor: '#1c243d', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>Resumo da Reserva</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#121829', padding: '12px', borderRadius: '8px', fontSize: '14px' }}>
              <span style={{ color: '#8fa0dd' }}>Identificação:</span>
              <strong>Armário {m_armario.posicao}</strong>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#121829', padding: '12px', borderRadius: '8px', fontSize: '14px' }}>
              <span style={{ color: '#8fa0dd' }}>Localização:</span>
              <strong>{m_armario.nomeCorredor}</strong>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', backgroundColor: '#121829', padding: '12px', borderRadius: '8px', fontSize: '14px' }}>
              <span style={{ color: '#8fa0dd' }}>Descrição do Setor:</span>
              <span style={{ color: '#cbd5e1', fontSize: '13px' }}>{m_armario.descricao || "Sem observações adicionais"}</span>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '10px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '18px' }}>
              <span style={{ color: '#ffffff', fontWeight: 'bold' }}>Total:</span>
              <strong style={{ color: '#2ecc71', fontSize: '20px' }}>
                {m_armario.preco ? `R$ ${m_armario.preco.toFixed(2)}` : "Grátis"}
              </strong>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
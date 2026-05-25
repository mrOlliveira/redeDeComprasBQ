import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { lojaService } from '../../services/lojaServices';

export default function DetailsScreen() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const carregarProduto = async () => {
      try {
        const dados = await lojaService.buscarPorId(id);
        setProduto(dados);
      } catch (err) {
        setErro('Produto não encontrado.');
      }
    };
    carregarProduto();
  }, [id]);
  
  if (erro || !produto) return <div>{erro || 'Erro ao carregar'}</div>;

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <div style={{ 
        maxWidth: '400px', 
        margin: '0 auto', 
        padding: '20px', 
        border: '1px solid #ccc',
        borderRadius: '10px'
      }}>
        <h1>Detalhes</h1>
        <h2>{produto.nome || `Armário ${produto.posicao}`}</h2>
        <p><strong>Categoria:</strong> {produto.categoria || 'Estudantil'}</p>
        <p style={{ fontSize: '20px', color: '#2ecc71' }}>
          <strong>Preço:</strong> R$ {produto.preco?.toFixed(2)}
        </p>
        
        <button style={{ 
          width: '100%', 
          padding: '10px', 
          backgroundColor: '#28a745', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px',
          fontWeight: 'bold'
        }}>
          Comprar Agora
        </button>
      </div>
    </div>
  );
}
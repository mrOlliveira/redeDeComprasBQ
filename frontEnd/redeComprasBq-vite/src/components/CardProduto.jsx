import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CardProduto.css';

export default function CardProduto({ produto, aoComprar }) {
    const navigate = useNavigate();
    
  return (
    <div className="card-produto glass">
      <div className="imagem-container">
        <img src={produto.imagem_url || 'https://via.placeholder.com/150'} alt={produto.nome} />
      </div>
      <div className="info">
        <span className="categoria">{produto.categoria.toUpperCase()}</span>
        <h3>{produto.nome}</h3>
        <p className="preco">R$ {produto.preco.toFixed(2)}</p>
        <button className="btn-comprar" onClick={() => aoComprar(produto)}>
          COMPRAR
        </button>
      </div>
    </div>
  );
}
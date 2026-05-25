export default function CardProduto({ produto }) {
  const nomeExibicao = produto.nome || `Armário ${produto.posicao}`;

  return (
    <div style={{ 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      padding: '15px', 
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3>{nomeExibicao}</h3>
      <p style={{ fontWeight: 'bold', color: '#2ecc71' }}>
        R$ {produto.preco?.toFixed(2)}
      </p>
      
      <button style={{ 
        backgroundColor: '#007bff', 
        color: 'white', 
        border: 'none', 
        padding: '8px 12px', 
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        VER DETALHES
      </button>
    </div>
  );
}
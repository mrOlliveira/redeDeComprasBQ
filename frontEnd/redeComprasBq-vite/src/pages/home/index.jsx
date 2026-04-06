    import React, { useEffect, useState } from 'react';
    import { lojaService } from '../../services/lojaServices';
    import CardProduto from '../../components/CardProduto';
    import { Link } from 'react-router-dom';

    export default function Home() {

      const [armarios, setArmarios] = useState([]);
      const [erro, setErro] = useState(null);

      useEffect(() => {
        const carregarDados = async () => {
          try {
            const dados = await lojaService.buscarTodos();
            setArmarios(dados);
          } catch (err) {
            setErro("Não foi possível carregar os armários.");
          }
        };
        carregarDados();
      }, []);

      return (
        <div style={{ padding: '20px', minHeight: '100vh' }}>
          <h1 style={{ textAlign: 'center' }}>Armários Disponíveis</h1>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
            gap: '15px' 
          }}>
            {armarios.map((item) => (
              <Link key={item.id} to={`/details/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardProduto produto={item} />
              </Link>
            ))}
          </div>
        </div>
      );
    }
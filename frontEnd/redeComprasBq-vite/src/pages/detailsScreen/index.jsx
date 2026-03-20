import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lojaService } from '../../services/lojaService';
import './details.css'; // Vamos criar esse CSS abaixo

export default function DetailsScreen() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregarDetalhes() {
            setLoading(true);
            try {
                // Buscando o produto específico pelo ID no Supabase
                const dados = await lojaService.buscarPorId(id);
                setItem(dados);
            } catch (error) {
                console.error("Erro ao carregar item:", error);
            } finally {
                setLoading(false);
            }
        }
        carregarDetalhes();
    }, [id]);

    if (loading) return <div className="loading">Carregando detalhes...</div>;
    if (!item) return <div className="error">Produto não encontrado.</div>;

    return (
        <div className="details-page">
            <button className="btn-voltar" onClick={() => navigate(-1)}>
                ← Voltar
            </button>

            <div className="details-card glass">
                <div className="image-section">
                    <img src={item.imagem_url || 'https://via.placeholder.com/400'} alt={item.nome} />
                </div>

                <div className="info-section">
                    <span className="badge-neon">{item.categoria}</span>
                    <h1>{item.nome}</h1>
                    <p className="description">{item.descricao || 'Sem descrição disponível para este item.'}</p>
                    
                    <div className="price-tag">
                        R$ {item.preco?.toFixed(2)}
                    </div>

                    <button className="btn-confirmar">
                        RESERVAR AGORA
                    </button>
                    
                    <p className="stock-info">
                        {item.quantidade > 0 ? `Disponível: ${item.quantidade} unidades` : 'Indisponível no momento'}
                    </p>
                </div>
            </div>
        </div>
    );
}
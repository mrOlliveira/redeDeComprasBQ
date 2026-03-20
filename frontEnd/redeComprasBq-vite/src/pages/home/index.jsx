import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { lojaService } from "../../services/lojaService";

export default function Home() {
  const [armarios, setArmarios] = useState([]);
  const navigate = useNavigate();

  // Função simples para buscar os dados
  useEffect(() => {
    lojaService.listarArmariosDisponiveis()
      .then((res) => setArmarios(res))
      .catch((err) => console.log("Erro ao buscar armários:", err));
  }, []);

  return (
    <div className="bg-slate-900 min-h-screen p-6 text-white">
      <h1 className="text-2xl font-bold text-center mb-6">
        Mapa de Armários - Bento Quirino
      </h1>

      {/* Grid simples que funciona em qualquer tela */}
      <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
        {armarios.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(`/detalhes/${item.id}`)}
            // Cor verde se estiver livre, vermelho se estiver ocupado
            className={`p-4 rounded shadow-lg text-center font-bold transition-all
              ${item.esta_ocupado ? "bg-red-600 opacity-50" : "bg-green-600 hover:bg-green-500"}`}
            disabled={item.esta_ocupado}
          >
            <p className="text-xs">Bloco {item.bloco}</p>
            <p className="text-lg">{item.numero_armario}</p>
          </button>
        ))}
      </div>

      {/* Legenda básica no rodapé */}
      <div className="mt-8 flex justify-center gap-4 text-sm">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-600 rounded"></div> <span>Livre</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-600 rounded"></div> <span>Ocupado</span>
        </div>
      </div>
    </div>
  );
}
useEffect(() => {
  lojaService.listarArmariosDisponiveis()
    .then((res) => {
      console.log("Dados que vieram do banco:", res); // <-- Adicione isso
      setArmarios(res);
    })
    .catch((err) => console.log("Erro real:", err));
}, []);
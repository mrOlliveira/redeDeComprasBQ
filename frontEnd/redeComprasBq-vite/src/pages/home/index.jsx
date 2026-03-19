import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [armarios, setArmarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/armarios")
      .then((response) => response.json())
      .then((data) => setArmarios(data))
      .catch((error) => console.error("Erro:", error));
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">
        Mapa de Armários
      </h1>

      {/* Grid Responsivo: 2 colunas no celular, 5 no tablet, 10 no PC */}
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-4">
        {armarios.map((item) => {
          // Lógica de cores baseada no status
          const statusColors = {
            0: "bg-green-500 hover:bg-green-600", // Livre
            1: "bg-red-500 hover:bg-red-600",     // Ocupado
            2: "bg-amber-500 hover:bg-amber-600"  // Reservado
          };

          return (
            <button
              key={item.id}
              onClick={() => navigate(`/detalhes/${item.id}`, { state: { armarioSelec: item } })}
              className={`${statusColors[item.status]} aspect-square rounded-xl shadow-md transition-all 
                         flex flex-col items-center justify-center text-white active:scale-95`}
            >
              <span className="text-xl mb-1">🔒</span>
              <span className="font-bold">{item.posicao}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
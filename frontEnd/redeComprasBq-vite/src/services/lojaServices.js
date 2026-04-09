// Remova o useParams se não estiver usando dentro deste objeto
const API_URL = 'http://localhost:5000/armarios';

export const lojaService = {
  buscarTodos: async () => {
    try {
      // Agora o fetch bate no seu servidor Node (porta 5000)
      const response = await fetch(API_URL);
      const dados = await response.json();
      return dados;
    } catch (error) {
      console.error("Falha ao buscar todos os armários:", error);
      return []; // Retorna uma lista vazia para evitar erros no .map() do front
    }
  },

  buscarPorId: async (id) => {
    try {
      // O seu servidor Node precisa de uma rota para buscar por ID se você for usar esta função
      const response = await fetch(`${API_URL}/${id}`);
      const dados = await response.json();
      return dados;
    } catch (error) {
      console.error(`Falha ao buscar o armário com ID ${id}:`, error);
    }
  }
};
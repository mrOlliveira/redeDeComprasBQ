import supabase from '../config/supabase';

export const lojaModelo = {
  // --- UNIFORMES ---
  
  // Listar uniformes disponíveis com estoque
  async listarUniformes() {
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .eq('categoria', 'uniforme')
      .gt('estoque', 0); // Só mostra se tiver no estoque

    if (error) throw error;
    return data;
  },

  // --- ARMÁRIOS ---

  // Listar armários que estão LIVRES para aluguel
  async listarArmariosDisponiveis() {
    const { data, error } = await supabase
      .from('armarios_detalhes')
      .select(`
        id,
        numero_armario,
        bloco,
        produtos (
          id,
          nome,
          preco
        )
      `)
      .eq('esta_ocupado', false);

    if (error) throw error;
    return data;
  },

  // --- PROCESSO DE COMPRA / ALUGUEL ---

  async realizarCompra(usuarioId, produtoId, tipo, detalheId = null) {
    // 1. Criar o registro do Pedido
    const { data: pedido, error: erroPedido } = await supabase
      .from('pedidos')
      .insert([{ 
        usuario_id: usuarioId, 
        valor_total: 0, // O ideal é buscar o preço no banco antes, mas simplificamos aqui
        status: 'pago' 
      }])
      .select()
      .single();

    if (erroPedido) throw erroPedido;

    // 2. Se for ARMÁRIO, precisamos marcar como OCUPADO
    if (tipo === 'armario' && detalheId) {
      const { error: erroArmario } = await supabase
        .from('armarios_detalhes')
        .update({ 
          esta_ocupado: true, 
          aluno_id: usuarioId 
        })
        .eq('id', detalheId);

      if (erroArmario) throw erroArmario;
    } 
    
    // 3. Se for UNIFORME, precisamos baixar o ESTOQUE
    else if (tipo === 'uniforme') {
      // Usamos uma RPC (função do banco) ou um update simples
      // Aqui vamos apenas decrementar 1 unidade para o exemplo
      const { error: erroEstoque } = await supabase.rpc('decrement_estoque', { row_id: produtoId });
      if (erroEstoque) throw erroEstoque;
    }

    return pedido;
  }
};
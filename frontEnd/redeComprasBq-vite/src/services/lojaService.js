import { supabase } from './supabase';

export const lojaService = {
  // --- BUSCAS (SELECTS) ---

  // Busca um item específico (Uniforme ou Armário) pelo ID
  async buscarPorId(id) {
    // 1. Tenta buscar na tabela de produtos (Uniformes)
    const { data: produto, error: erroProd } = await supabase
      .from('produtos')
      .select('*')
      .eq('id', id)
      .maybeSingle(); // Use maybeSingle para não quebrar se não achar na primeira tabela

    if (produto) return { ...produto, tipo: 'uniforme' };

    // 2. Se não achou, tenta buscar na tabela de armários
    const { data: armario, error: erroArm } = await supabase
      .from('armarios_detalhes')
      .select(`
        id,
        numero_armario,
        bloco,
        esta_ocupado,
        produtos (nome, preco, descricao, imagem_url)
      `)
      .eq('id', id)
      .maybeSingle();

    if (armario) {
      // "Achata" o objeto para facilitar o uso no Frontend
      return {
        id: armario.id,
        nome: `Armário ${armario.numero_armario} - Bloco ${armario.bloco}`,
        preco: armario.produtos.preco,
        descricao: armario.produtos.descricao || `Aluguel de armário no bloco ${armario.bloco}`,
        imagem_url: armario.produtos.imagem_url,
        categoria: 'armário',
        tipo: 'armario'
      };
    }

    if (erroProd || erroArm) throw (erroProd || erroArm);
    return null;
  },

  async listarUniformes() {
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .eq('categoria', 'uniforme')
      .gt('estoque', 0);

    if (error) throw error;
    return data;
  },

  async listarArmariosDisponiveis() {
    const { data, error } = await supabase
      .from('armarios_detalhes')
      .select(`
        id,
        numero_armario,
        bloco,
        produtos (id, nome, preco, imagem_url)
      `)
      .eq('esta_ocupado', false);

    if (error) throw error;
    
    // Mapeia para um formato padrão de card
    return data.map(item => ({
      id: item.id,
      nome: `Armário ${item.numero_armario}`,
      subtitulo: `Bloco ${item.bloco}`,
      preco: item.produtos.preco,
      imagem_url: item.produtos.imagem_url,
      categoria: 'armário'
    }));
  },

  // --- AÇÕES (COMPRA E ALUGUEL) ---

  async comprarUniforme(usuarioId, produtoId, quantidade, precoUnitario) {
    const valorTotal = quantidade * precoUnitario;

    const { data: pedido, error: erroPedido } = await supabase
      .from('pedidos')
      .insert([{ usuario_id: usuarioId, valor_total: valorTotal, status: 'pago' }])
      .select().single();

    if (erroPedido) throw erroPedido;

    await supabase.from('itens_pedido').insert([{
      pedido_id: pedido.id,
      produto_id: produtoId,
      quantidade,
      preco_unitario: precoUnitario
    }]);

    await supabase.rpc('decrement_estoque', { row_id: produtoId });

    return pedido;
  },

  async alugarArmario(usuarioId, armarioId, produtoId, preco) {
    const { data: pedido, error: erroPedido } = await supabase
      .from('pedidos')
      .insert([{ usuario_id: usuarioId, valor_total: preco, status: 'pago' }])
      .select().single();

    if (erroPedido) throw erroPedido;

    const { error: erroArmario } = await supabase
      .from('armarios_detalhes')
      .update({ esta_ocupado: true, aluno_id: usuarioId })
      .eq('id', armarioId);

    if (erroArmario) throw erroArmario;

    return pedido;
  }
};
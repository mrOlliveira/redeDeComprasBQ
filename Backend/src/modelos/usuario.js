import { supabase } from '../config/supabase';

// 2. Cadastro de Aluno/Admin
export const usuarioModelo = {
  async cadastrar(nome, email, senha, documento, tipo) {
    const { data, error } = await supabase
      .from('usuarios')
      .insert([
        { 
          nome, 
          email, 
          senha, // Dica: O Supabase Auth é melhor para senhas, mas aqui segue sua tabela
          documento, 
          tipo // 'aluno' ou 'admin'
        }
      ])
      .select();

    if (error) {
      console.error("Erro ao cadastrar usuário:", error.message);
      throw error;
    }
    return data[0];
  },

  async buscarPerfil(email) {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .single();

    if (error) throw error;
    return data;
  }
};
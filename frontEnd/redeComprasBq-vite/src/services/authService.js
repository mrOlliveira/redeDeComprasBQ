import { supabase } from './supabaseClient';

export const authService = {
  // Login simples comparando com a tabela de usuários
  async login(email, senha) {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .eq('senha', senha) 
      .single();

    if (error) throw new Error('Credenciais inválidas ou usuário não encontrado.');
    return data;
  },

  // Cadastro de Aluno
  async cadastrarAluno(nome, email, senha, documento) {
    const { data, error } = await supabase
      .from('usuarios')
      .insert([{ 
        nome, 
        email, 
        senha, 
        documento, 
        tipo: 'aluno' 
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Buscar perfil para persistir sessão manualmente
  async getPerfil(id) {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }
};
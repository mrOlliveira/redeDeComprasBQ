import { createClient } from '@supabase/supabase-js';

// No Vite, usamos import.meta.env para acessar as variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verificação de segurança para evitar erros chatos de 'undefined'
if (!supabaseUrl || !supabaseKey) {
    console.error("Erro: As chaves do Supabase não foram encontradas no arquivo .env");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
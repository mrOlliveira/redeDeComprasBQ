const supabase = require('./src/config/supabase');

async function testarConexao() {
    const { data, error } = await supabase.from('produtos').select('*').limit(1);
    
    if (error) {
        console.error('Erro ao conectar:', error.message);
    } else {
        console.log('Conexão bem-sucedida! Dados:', data);
    }
}

testarConexao();
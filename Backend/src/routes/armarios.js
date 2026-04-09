import express from 'express';
// O segredo é o ".js" no final do caminho!
import { supabase } from '../lib/supabase.js'; 

const router = express.Router();

router.get('/armarios', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('armarios')
      .select('*')
      .order('numero', { ascending: true });

    if (error) throw error;

    res.json(data); 
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar dados do Supabase' });
  }
});

export default router;
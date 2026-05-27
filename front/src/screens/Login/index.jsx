import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styles } from './styles';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const response = await fetch('http://localhost:3000/cadastros');
      const usuarios = await response.json();

      const usuarioEncontrado = usuarios.find(
        (u) =>
          u.email.toLowerCase().trim() === email.toLowerCase().trim() &&
          u.senha === senha
      );

      if (usuarioEncontrado) {

        localStorage.setItem(
          'usuarioLogado',
          JSON.stringify(usuarioEncontrado)
        );

        if (usuarioEncontrado.admin === true) {
          navigate('/HomeAdmin');
        } else {
          navigate('/home');
        }

      } else {
        setErro('Email ou senha inválidos');
      }

    } catch (erro) {
      setErro(
        'Erro ao conectar com o servidor. Verifique se o json-server está rodando.'
      );
    }
  };

  return (
    <div className={styles.pageContainer}>
      <form onSubmit={handleLogin} className={styles.formBox}>

        <div className={styles.headerContainer}>
          <h2 className={styles.title}>
            Bem-vindo
          </h2>

          <p className={styles.subtitle}>
            Insira suas credenciais para acessar sua conta
          </p>
        </div>

        {erro && (
          <div className={styles.errorBox}>
            <span className="text-base">⚠️</span> {erro}
          </div>
        )}

        <div className={styles.inputGroup}>
          <label className={styles.label}>
            E-mail
          </label>

          <input
            type="email"
            placeholder="exemplo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>
            Senha
          </label>

          <input
            type="password"
            placeholder="••••••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <button type="submit" className={styles.buttonSubmit}>
          Entrar na Conta
        </button>
      </form>
    </div>
  );
}
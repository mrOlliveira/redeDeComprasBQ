Index:
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

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
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
        navigate('/');
      } else {
        setErro('Email ou senha inválidos');
      }

    } catch {
      setErro('Erro ao conectar com o servidor');
    }
  };

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>Login</h2>

        {erro && <p className="erro">{erro}</p>}

        <div className="input">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input">
          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

Css:
body {
  margin: 0;
  overflow: hidden;
}

.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1a1f2e;
  padding: 20px;
}

.login-box {
  background: #2d3d7c;
  padding: 30px 25px;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.login-box h2 {
  color: #fff;
  text-align: center;
  margin: 0;
}

.input {
  display: flex;
  flex-direction: column;
}

.input label {
  color: #fff;
  margin-bottom: 5px;
  color: #ffffff;
}

.input input {
  padding: 10px;
  border: 1px solid #fff;
  border-radius: 8px;
  outline: none;
  transition: 0.3s;
}

button {
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: #00d2ff;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #00c6ff;
}

.erro {
  background: #ffe0e0;
  color: #d8000c;
  padding: 8px;
  border-radius: 6px;
  font-size: 14px;
  text-align: center;
}

db.json:
"cadastros": [
    {
      "email": "carriscarmiguel@gmail.com",
      "senha": "123456"
    }
  ],

import React from "react";
import "./Login.css";
import axios from "axios";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página.

    console.log(email, password);

    try {
      // Requisição POST para o endpoint de login.
      const response = await axios.post(
        "http://localhost:3000/login",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response.data);
      setUser(response.data); // Atualiza o estado com os dados do usuário.
    } catch (error) {
      //tratamento de erro
      if (!error?.response) {
        setError("Erro ao acessar o servidor");
      } else if (error.response.status == 401) {
        setError("Usuário ou senha inválidos");
      }
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    setUser(null); // Reseta o estado do usuário, deslogando-o.
    setError(""); //limpa a msg
  };

  return (
    <div className="login-form-wrap">
      {user == null ? (
        <div>
          <h2>Login</h2>
          <form className="login-form">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)} //atualiza com o valor de input
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)} //atualiza com o valor de input
            />
            <button
              type="submit"
              className="btn-login"
              onClick={(e) => handleLogin(e)} // Chama a função de login ao submeter o formulário
            >
              Login
            </button>
          </form>
          <p>{error}</p> {/* mensagem de erro */}
        </div>
      ) : (
        <div>
          <h2>Olá, {user.name}</h2> {/* mensagem de boas vindas */}
          <button
            type="button"
            className="btn-login"
            onClick={(e) => handleLogout(e)}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;

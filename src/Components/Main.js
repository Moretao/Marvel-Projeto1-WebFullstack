import React, { useState, useEffect } from 'react';
import { Card } from "./Card";
import axios from "axios";

export const Main = () => { // Define o componente funcional Main

  // Declaração de estados utilizando useState
  const [url, setUrl] = useState("http://gateway.marvel.com/v1/public/characters?ts=1&apikey=2e1cdeec426ae323484f29024084c206&hash=d516513ba95b9407c7aca0f73b241f8a"); // URL inicial para a busca de personagens
  const [item, setItem] = useState(); // Estado para armazenar os resultados da busca
  const [search, setSearch] = useState(""); // Estado para armazenar a string de busca do usuário
  const [errorMessage, setErrorMessage] = useState(""); // Estado para armazenar mensagens de erro

  // useEffect utilizado para fazer a busca de personagens quando a URL muda
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        setItem(res.data.data.results);

        setErrorMessage(""); // Limpa a mensagem de erro

      } catch (error) {
        console.error("Erro ao buscar personagens:", error);
        setErrorMessage("Ocorreu um erro ao buscar os personagens. Por favor, tente novamente mais tarde.");
        setItem([]);
      }
    };

    fetchData(); // Chama a função fetchData para buscar os personagens
  }, [url]);

  // tratamento de erro
  const handleSearch = async () => {
    try {
      if (search.trim().length < 1) { // Verifica se a pesquisa está em branco
        setErrorMessage("A pesquisa não pode ser em branco");
        return;
      }
      if (search.trim().length < 4) { // Verifica se a pesquisa tem menos de 4 caracteres
        setErrorMessage("A pesquisa tem que ter mais de 3 caracteres");
        return;
      }

      // Constrói a URL de busca com base na entrada do usuário
      const searchUrl = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${search}&ts=1&apikey=2e1cdeec426ae323484f29024084c206&hash=d516513ba95b9407c7aca0f73b241f8a`;
      setUrl(searchUrl);
    } catch (error) {
      console.error("Erro ao realizar pesquisa:", error); // Registra o erro no console
      setErrorMessage("Ocorreu um erro ao realizar a pesquisa. Por favor, tente novamente mais tarde.");
    }
  };

  return (
    <> { }
      <div className="header">
        <div class="tittle"> { }
          <h1>MARVEL PANTHEON</h1>
          <h3>Explore o universo da Marvel, descubra todos os personagens da Marvel com facilidade! </h3>
        </div>
        <div className="search-bar">
          <img src="./Images/logo.jpeg" alt="logo" /> { }
          { }
          <input
            type="search"
            placeholder='Faça sua Pesquisa'
            className='search'
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch(); // Chama a função handleSearch quando a tecla Enter é pressionada
              }
            }}
          />
        </div>
        {/* Exibe a mensagem de erro, se houver */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <div className="content">
        {/* Exibe os resultados da busca se houver, senão exibe 'Not Found' */}
        {(!item) ? <p>Not Found</p> : <Card data={item} />}
      </div>
    </>
  );
};

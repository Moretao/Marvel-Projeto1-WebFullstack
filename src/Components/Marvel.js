import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

// Declaração do componente funcional Marvel
export const Marvel = () => {
  const { id } = useParams();
  const [item, setItem] = useState(); // Estado para armazenar infos do personagem

  // Função para buscar os detalhes do personagem pelo ID
  const fetch = async () => {
    try {
      const res = await axios.get(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=2e1cdeec426ae323484f29024084c206&hash=d516513ba95b9407c7aca0f73b241f8a`);
      setItem(res.data.data.results[0]);
    } catch (error) {
      console.error("Erro ao buscar detalhes do personagem:", error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <> { }
      {
        (!item) ? "" : ( // Verifica se há dados do personagem para exibir
          <div className="box-content"> { }
            <div className="right-box"> { }
              <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt="" /> { }
            </div>
            <div className="left-box"> { }
              <h1>{item.name}</h1> { }
              <h4>{item.description}</h4> { }
            </div>
          </div>
        )
      }
    </>
  );
};

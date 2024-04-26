import React from 'react';
import { useNavigate } from 'react-router-dom';


export const Card = ({ data }) => {
  let navigate = useNavigate(); // Inicializa o hook useNavigate para navegação 

  return (
    <> { }
      {
        (data) ? ( // Verifica se há dados para exibir
          data.map(item => { // Mapeia os itens do array 'data' para renderizar os cards
            return (
              <div className="card" key={item.id}
                onClick={() => navigate(`/${item.id}`)}> { }
                <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt="" /> { }
                <div className="title"> { }
                  <h3>{item.name}</h3>
                </div>
              </div>
            )
          })
        ) : "" // Se não houver dados, retorna uma string vazia
      }
    </>
  )
}

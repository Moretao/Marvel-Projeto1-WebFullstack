import React from "react"
import { Card } from "./Card"
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
export const Main = () => {
  const [url, setUrl] = useState("http://gateway.marvel.com/v1/public/characters?ts=1&apikey=2e1cdeec426ae323484f29024084c206&hash=d516513ba95b9407c7aca0f73b241f8a")
  const [item, setItem] = useState();
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(url)
      setItem(res.data.data.results);
    }
    fetch();
  }, [url])

  const searchMarvel = () => {
    setUrl(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${search}&ts=1&apikey=2e1cdeec426ae323484f29024084c206&hash=d516513ba95b9407c7aca0f73b241f8a`)
  }

  return (
    <>
      <div className="header">
        {<div class="tittle">
          <h1>MARVEL PANTHEON</h1>
          <h3>Explore o universo da Marvel, descubra todos os personagens da Marvel com facilidade! </h3>
        </div>}
        <div className="search-bar">
          <img src="./Images/logo.jpeg" alt="logo" />
          <input type="search" placeholder='Faça sua Pesquisa'
            className='search'
            onChange={e => setSearch(e.target.value)}
            onKeyPress={searchMarvel} />
        </div>
      </div>
      <div className="content">

        {
          (!item) ? <p>Not Found</p> : <Card data={item} />
        }
      </div>
    </>
  )
}

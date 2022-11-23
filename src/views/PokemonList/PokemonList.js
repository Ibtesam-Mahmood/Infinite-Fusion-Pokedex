import React, { useState } from 'react'
import PokemonListItem from './PokemonListItem';
import './PokemonList.css';

export default function PokemonList({ pokemon }) {

  // Items on a page
  const pageCount = 50;

  // The state for the current page
  const [page, setPage] = useState(0);

  function getLastPageCount(){
    return Math.floor(pokemon.length / pageCount);
  }

  function prevPage() {
    if(page != 0){
      setPage(page - 1);
    }
  }

  function nextPage() {
    if(page != getLastPageCount()){
      setPage(page + 1);
    }
  }

  return (
    <div>

    <div className="grid-container">
        {pokemon.slice(page * pageCount, (page * pageCount) + pageCount).map(p => (
          <PokemonListItem 
            key={p.getID()} 
            pokemonInfo={p} 
          />
      ))}
    </div>

    <div>
      <button disabled={page == 0} onClick={prevPage}>Back</button>
      <button disabled={page == getLastPageCount()} onClick={nextPage}>Next</button>
    </div>

    </div>
  )
}

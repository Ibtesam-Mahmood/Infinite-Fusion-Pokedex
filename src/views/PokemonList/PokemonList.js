import React, { useState } from 'react'
import PokemonListItem from './PokemonListItem';
import {Row, Col} from 'react-bootstrap';

export default function PokemonList({ pokemon }) {

  // Items on a page
  const pageCount = 200;

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

    <Row className="m-1">
      {pokemon.slice(page * pageCount, (page * pageCount) + pageCount).map(p => (
        <Col className="p-1 col-12 col-sm-6 col-md-3 col-lg-2 col-xl-2">
          <PokemonListItem 
            key={p.getID()} 
            pokemonInfo={p} 
          />
        </Col>
      ))}
    </Row>

    <div>
      <button disabled={page == 0} onClick={prevPage}>Back</button>
      <button disabled={page == getLastPageCount()} onClick={nextPage}>Next</button>
    </div>

    </div>
  )
}

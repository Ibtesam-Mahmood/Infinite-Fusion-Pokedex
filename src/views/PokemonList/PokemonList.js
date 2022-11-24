import React from 'react'
import PokemonListItem from './PokemonListItem';
import {Row, Col} from 'react-bootstrap';

export default function PokemonList({ pokemon }) {

  return (
    <Row className="m-1">
      {pokemon.map(p => (
        <Col 
          key={p.getID()} 
          className="p-1 col-12 col-sm-6 col-md-3 col-lg-2 col-xl-2">
          <PokemonListItem 
            pokemonInfo={p} 
          />
        </Col>
      ))}
    </Row>
  )
}

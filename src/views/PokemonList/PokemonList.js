import React from 'react'
import PokemonListItem from './PokemonListItem';
import {Row, Col} from 'react-bootstrap';

export default function PokemonList({ pokemon, mini = false }) {

  return (
    <Row className="m-1 justify-content-center">
      {
        pokemon.map(p => (
          <Col 
            key={p.getID()} 
            style={{maxWidth: mini ? '100px' : '180px'}}
            className="p-1 col-12">
            <PokemonListItem 
              pokemonInfo={p} 
              mini={mini}
            />
          </Col>
        ))
      }
    </Row>
  )
}

//col-sm-6 col-md-3 col-lg-2 col-xl-2
import React from 'react'

import '../../styles/PokemonStats.scss';
import PokemonMoveListItem from './PokemonMoveListItem';

export default function PokemonMoves({pokemon}) {

  const moves = pokemon != null ? pokemon.moves : null;
  console.log(moves);

  return (
    <div className='statsContainer container py-1'>
      <h5>Moves</h5>
      <div className='movesList'>
        {
          moves != null ?
          moves.map(move => {
            return (
              <PokemonMoveListItem moveInfo={move} />
            )
          })
          : null
        }
      </div>
    </div>
  )
}

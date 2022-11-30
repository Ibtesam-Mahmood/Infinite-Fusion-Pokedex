import React from 'react'

import '../../styles/PokemonStats.scss';
import PokemonMoveListItem from './PokemonMoveListItem';

export default function PokemonMoves({pokemon}) {

  const moves = pokemon != null ? pokemon.moves : null;
  console.log(moves);

  return (
    <div className='statsContainer container py-1'>
      <h5>Moves</h5>
      <div className='movesList mb-2'>
        {
          moves != null ?
          moves.map((move, index) => {
            return (
              <PokemonMoveListItem key={index} moveInfo={move} />
            )
          })
          : null
        }
      </div>
    </div>
  )
}

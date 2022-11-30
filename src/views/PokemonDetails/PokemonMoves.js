import React from 'react'
import {useMoves} from '../../services/hook'
import PokemonSpinner from '../PokemonSpinner';

import '../../styles/PokemonStats.scss';
import PokemonMoveListItem from './PokemonMoveListItem';

export default function PokemonMoves({pokemon}) {

  const moves = pokemon != null ? pokemon.moves : [];
  const moveIds = moves.map(move => move.move.url.split('/').reverse()[1]);

  const [movesMap, movesLoaded] = useMoves(moveIds, true);
  // console.log(movesMap);

  return (
    <div className='statsContainer container py-1'>
      <h5>Moves</h5>
      {
        !movesLoaded ? <PokemonSpinner scale={0.5} /> : 
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
      }
    </div>
  )
}

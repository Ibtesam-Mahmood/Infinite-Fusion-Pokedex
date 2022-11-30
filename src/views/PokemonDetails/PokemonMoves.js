import React from 'react'
import {useMoves} from '../../services/hook'
import PokemonSpinner from '../PokemonSpinner';

import '../../styles/PokemonStats.scss';
import PokemonMoveListItem from './PokemonMoveListItem';

export default function PokemonMoves({pokemon}) {

  let moves = pokemon != null ? pokemon.moves : [];

  //Filters any moves that are not learnt by level up or egg and then sorts them by level
  moves = moves.filter((move) => {
    const learnMethod = move.details.move_learn_method.name;
    return learnMethod === 'egg' || learnMethod === 'level-up';
  });
  moves.sort((a, b) => { return a.details.level_learned_at - b.details.level_learned_at; });

  const moveIds = moves.map(getMoveInfoID);
  
  const [movesMap, movesLoaded] = useMoves(moveIds, true);
  // console.log(moves);

  function getMoveInfoID(move) { return move.move.url.split('/').reverse()[1]; }

  return (
    <div className='statsContainer container py-1'>
      <h5>Moves</h5>
      {
        !movesLoaded ? <PokemonSpinner scale={0.5} /> : 
        <div className='movesList mb-2'>
          <table>
            <thead>
              <tr>
                <th>Level</th>
                <th>Move</th>
                <th>Type</th>
                <th>Cat</th>
                <th>Pwr.</th>
                <th>Acc.</th>
                <th>PP.</th>
              </tr>
            </thead>
            <tbody>
              {
                moves.map((pokemonMove, index) => {
                  return (
                    <PokemonMoveListItem 
                      key={`pokemonMove-${index}`} 
                      move={pokemonMove} 
                      moveInfo={movesMap[getMoveInfoID(pokemonMove)]} 
                    />
                  )
                })
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  )
}

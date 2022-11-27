import React from 'react';
import {usePokemonBySpecies} from '../../services/hook';
import PokemonImageToken from './PokemonImageToken';

export default function PokemonEvolutionDetails({evolution}) {

  const speciesIDs = evolution?.getSpeciesIDs();
  const speciesMap = usePokemonBySpecies(speciesIDs ?? [], true);
  
  return (
    <div className='statsContainer container py-1'>
      <h5>Evolution Chain</h5>
      {
        speciesIDs != null ?
        evolution.chain.map(e => {
          const id = e[0].speciesID;
          const speciesData = speciesMap[id];
          const [species, pokemon] = speciesData ?? [null, null];
          // console.log(id);
          return (
            <PokemonImageToken key={id} pokemon={pokemon}/>
          )
        }) : null
      }
    </div>
  )
}

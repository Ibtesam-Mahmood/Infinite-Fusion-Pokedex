import React from 'react';
import {usePokemonBySpecies} from '../../services/hook';
import PokemonImageToken from './PokemonImageToken';
import PokemonEvolutionDetailsArrow from './PokemonEvolutionDetailsArrow';
import PokemonSpinner from '../PokemonSpinner';

import '../../styles/PokemonStats.scss';

export default function PokemonEvolutionDetails({evolution}) {

  const speciesIDs = evolution?.getSpeciesIDs();
  const [speciesMap, loaded] = usePokemonBySpecies(speciesIDs ?? [], true);
  
  return (
    <div className='statsContainer container py-1'>
      <h5>Evolution Chain</h5>
      <table className='evolutionContainer'>
        {
          speciesIDs != null ?
          evolution.chain.map((e, i) => {
            
            const ids = e.map(item => item.speciesID);
            const details = i < evolution.chain.length - 1 ? evolution.chain[i + 1] : null;
            
            const id = e[0].speciesID;
            
            // console.log(id);
            return (
              <tbody key={`${i}-pokemonBody`}>
                <tr key={`${i}-pokemon`}>
                  {ids.map((id, k) => {

                    const [species, pokemon] = speciesMap[id] ?? [null, null];

                    return (
                      <td key={`${i}-${k}-pokemonItem`} ><PokemonImageToken pokemon={pokemon}/></td>
                    )
                  })}
                  
                </tr>
                {details != null ? <tr key={`${i}-evolutionDetails`}>
                  {details.map((d, j) => {
                    return (
                      <td key={`${i}-${j}-evolutionDetailsItem`}>
                        <PokemonEvolutionDetailsArrow details={d.details} />
                      </td>
                    )
                  })}
                </tr> : null}
              </tbody>
            )
          }) : <tbody><tr><td><PokemonSpinner scale={0.5}/></td></tr></tbody>
        }
      </table>
    </div>
  )
}

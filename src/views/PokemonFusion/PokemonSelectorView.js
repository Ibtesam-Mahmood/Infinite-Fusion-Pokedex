import React from 'react';
import { useLoadPokemon } from '../../services/hook';
import PokemonStats from '../PokemonDetails/PokemonStats';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faMagnifyingGlassPlus, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import PokemonTypes from '../TypeImage/PokemonTypeImage';

export default function PokemonSelectorView({pokemonID, onFind}) {

  const pokemon = useLoadPokemon(pokemonID);

  const disabled = pokemon == null;
  const title = pokemon?.name ?? 'Select a Pokemon';
  const pokemonIDTitle = `No. ${pokemonID ?? '-'}`;

  function getPokemonTypeColor() {
    if(pokemon == null){
      return ''
    };

    const typeOne = pokemon.getFirstType();
    // console.log(typeOne);
    return `typeBackground-${typeOne}`;

  }

  function name(params) {
    
  }

  return (
    <table className='selectorDisplay'>
      <thead>
        <th colspan="4" className='text-capitalize'>{title}</th>
      </thead>
      <tbody>
        <tr className=''>
          <td colspan="2" className='p-3'>
            <div class="row">

              {/* Image and Type */}
              <div class="col col-6">
                <div className={`${getPokemonTypeColor()} selectedPokemonImage mx-auto`} >
                  {
                    disabled ? <div className='d-flex justify-content-center my-5'>
                      <button type="button" className="btn btn-lg btn-outline-warning">
                        <div className='p-2'>
                          <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
                          <span className='ps-2'>Find Pokemon</span>
                        </div>
                      </button>
                    </div> : 
                    <>
                      <img
                        height='100%'
                        width='100%'
                        className={`img-fluid`} 
                        src={pokemon?.sprites?.front_default} 
                        alt={pokemon?.name}
                      />
                      <div className='selectedTypeContainer'>
                        <PokemonTypes pokemon={pokemon} variant={true} />
                      </div>
                    </>
                  }
                </div>
              </div>

              {/* Stats */}
              <div class="col col-6">
                <div class="row justify-content-between gy-2">
                  <div class="col-6 text-start">
                    <h5 className='text-capitalize p-0 m-0'>{pokemonIDTitle}</h5>
                  </div>
                  <div class="col-6 d-flex justify-content-end">
                    <button disabled={disabled} type="button" className="btn btn-sm btn-outline-info">
                      <div className='px-1'>
                        <FontAwesomeIcon icon={faInfoCircle} color={'$info'} />
                      </div>
                    </button>
                  </div>
                  <div class="col col-12">
                    {disabled ? null : <PokemonStats pokemon={pokemon} variant={true}/>}
                  </div>
                </div>
              </div>
            </div>
            
          </td>
        </tr>
        <tr>

          {/* Types */}
          {/* <td style={{width: '25%'}} className=''>1</td> */}

          {/* Abilities */}
          <td style={{width: '70%'}} className='selectedPokemonAbilities px-4'>
            <div className='d-flex justify-content-start'>
              <h6>Abilities:</h6>
            </div>
            <div className='row'>
            {
              disabled ? null : pokemon?.abilities?.map((ability, index) => {
                return (
                  <div key={index} className='col col-auto me-2 p-2'>
                    <p className='p-0 m-0'>{ability.ability.name}</p>
                  </div>
                )
              })
            }
            </div>
          </td>
          <td className='pe-0'>
            <button type="button" className="btn btn-lg btn-outline-warning">
              <div className='p-2'>
                <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
              </div>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

// {
//   pokemon.length != 0 ? 
//     <PaginatedPokemonList 
//       pokemon={pokemon} 
//       mini={true}
//     /> 
//     : null
// }
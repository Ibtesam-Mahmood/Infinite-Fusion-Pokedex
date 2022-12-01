import React from 'react';
import {useSelector} from 'react-redux';
import { useLoadPokemon } from '../../services/hook';
import PokemonStats from '../PokemonDetails/PokemonStats';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faMagnifyingGlassPlus, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import PokemonAbilities from '../PokemonDetails/PokemonAbilities';
import PokemonTypes from '../TypeImage/PokemonTypeImage';
import PaginatedPokemonList from '../PokemonList/PaginatedPokemonList';

export default function PokemonSelector({selectedID = 17, onSelect}) {

  const pokemonList = useSelector(state => state.pokemonInfo);
  
  const pokemon = useLoadPokemon(selectedID);

  function getPokemonTypeColor() {
    if(pokemon == null){
      return ''
    };

    const typeOne = pokemon.getFirstType();
    // console.log(typeOne);
    return `typeBackground-${typeOne}`;

  }

  return (
    <div className='selectorRoot p-2 container'>
      <table className='selectorDisplay'>
        <thead>
          <th colspan="4" className='text-capitalize'>{pokemon?.name}</th>
        </thead>
        <tbody>
          <tr className=''>
            <td colspan="2" className='p-3'>
              <div class="row">

                {/* Image and Type */}
                <div class="col col-6">
                  <div className={`${getPokemonTypeColor()} selectedPokemonImage mx-auto`} >
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
                  </div>
                </div>

                {/* Stats */}
                <div class="col col-6">
                  <div class="row justify-content-between gy-2">
                    <div class="col-6 text-start">
                      <h5 className='text-capitalize p-0 m-0'>No. {selectedID}</h5>
                    </div>
                    <div class="col-6 d-flex justify-content-end">
                      <button type="button" className="btn btn-sm btn-outline-info">
                        <div className='px-1'>
                          <FontAwesomeIcon icon={faInfoCircle} color={'$info'} />
                        </div>
                      </button>
                    </div>
                    <div class="col col-12">
                      <PokemonStats pokemon={pokemon} variant={true}/>
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
                pokemon?.abilities?.map((ability, index) => {
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
                  {/* <span className='pe-2'>Find</span> */}
                  <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
                </div>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
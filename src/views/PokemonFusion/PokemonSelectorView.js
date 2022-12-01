import React from 'react';
import { useLoadPokemon } from '../../services/hook';
import PokemonStats from '../PokemonDetails/PokemonStats';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faMagnifyingGlassPlus, faInfoCircle, faClose } from '@fortawesome/free-solid-svg-icons'
import PokemonTypes from '../TypeImage/PokemonTypeImage';

export default function PokemonSelectorView({pokemonID, onFind, onRemove}) {

  const pokemon = useLoadPokemon(pokemonID);

  const disabled = pokemon == null;
  const title = pokemon?.name ?? 'Select a Pokemon';
  const pokemonIDTitle = `No. ${pokemon?.getGameID() ?? '-'}`;

  function getPokemonTypeColor() {
    if(pokemon == null){
      return ''
    };

    const typeOne = pokemon.getFirstType();
    // console.log(typeOne);
    return `typeBackground-${typeOne}`;

  }

  return (
    <table className='selectorDisplay'>
      <thead>
        <tr><th colSpan="4" className='text-capitalize'>{title}</th></tr>
      </thead>
      <tbody>
        <tr className=''>
          <td colSpan="2" className='p-3'>
            <div className="row">

              {/* Image and Type */}
              <div className="col col-6">
                <div className={`${getPokemonTypeColor()} selectedPokemonImage mx-auto`} >
                  {
                    disabled ? <div className='d-flex justify-content-center my-5 mx-3'>
                      <button type="button" className="btn btn-lg btn-outline-warning" onClick={onFind}>
                        <div className='p-2'>
                          <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
                          <span className='ps-2'>Select Pokemon</span>
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
              <div className="col col-6">
                <div className="row justify-content-between gy-2">
                  <div className="col-6 text-start">
                    <h5 className='text-capitalize p-0 m-0'>{pokemonIDTitle}</h5>
                  </div>
                  <div className="col-6 d-flex justify-content-end">
                    {
                      disabled ? null : 
                      <button 
                        onClick={onRemove}
                        disabled={disabled} 
                        type="button" 
                        className="btn btn-sm btn-outline-danger"
                      >
                        <div className='px-1'>
                          <FontAwesomeIcon icon={faClose} color={'$info'} />
                        </div>
                      </button>
                    }
                  </div>
                  <div className="col col-12">
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
              <h6>{disabled ? '' : 'Abilities:'}</h6>
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
          <td className='pe-0 mx-3 btn-group'>
            {
              disabled ? null : 
              <a 
                type="button" 
                className="btn btn-lg btn-outline-info" 
                href={`/poke-fusion-dex/pokemon/${pokemonID}`} 
              >
                <div className='p-2'>
                  <FontAwesomeIcon icon={faInfoCircle}/>
                </div>
              </a>
            }
            <button type="button" className="btn btn-lg btn-outline-warning" onClick={onFind}>
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
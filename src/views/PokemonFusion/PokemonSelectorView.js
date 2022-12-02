import React from 'react';
import {useSelector} from 'react-redux';
import { useLoadPokemon } from '../../services/hook';
import PokemonStats from '../PokemonDetails/PokemonStats';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faMagnifyingGlassPlus, faInfoCircle, faClose, faShuffle } from '@fortawesome/free-solid-svg-icons'
// import PokemonTypes from '../TypeImage/PokemonTypeImage';

export default function PokemonSelectorView({pokemonID, onSelect, onFind}) {

  const pokemon = useLoadPokemon(pokemonID);
  const pokemonIDs = useSelector(state => state.pokemonInfo.map(p => p.getID()));

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
  
  function removeSelection() {
    onSelect(null);
  }

  function shuffleSelection() {
    const randomID = pokemonIDs[Math.floor(Math.random() * pokemonIDs.length)];
    onSelect(randomID);
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
                <div className="row justify-content-between gy-2">
                  <div className="col-6 text-start">
                    <h5 className='text-capitalize p-0 m-0'>{pokemonIDTitle}</h5>
                  </div>
                  <div className="col-6 d-flex justify-content-end">
                    {
                      disabled ? null : 
                      <button 
                        onClick={removeSelection}
                        disabled={disabled} 
                        type="button" 
                        className="btn btn-sm btn-outline-danger"
                      >
                        <div className='px-1'>
                          <FontAwesomeIcon icon={faClose} color={'$danger'} />
                        </div>
                      </button>
                    }
                  </div>
                  <div className={`${getPokemonTypeColor()} selectedPokemonImage mx-auto mb-3`} >
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
                          {/* <PokemonTypes pokemon={pokemon} variant={true} /> */}
                        </div>
                      </>
                    }
                  </div>

                  {/* Buttons */}
                  {
                    disabled ? null : 
                    <a 
                      type="button" 
                      className="btn col col-4 btn-lg btn-outline-info" 
                      href={`/poke-fusion-dex/pokemon/${pokemonID}`} 
                    >
                      <div className='p-2'>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                      </div>
                    </a>
                  }
                  <button type="button" className="btn col col-4 btn-lg btn-outline-primary" onClick={shuffleSelection}>
                    <div className='p-2'>
                      <FontAwesomeIcon icon={faShuffle} />
                    </div>
                  </button>
                  <button type="button" className="btn col col-4 btn-lg btn-outline-warning" onClick={onFind}>
                    <div className='p-2'>
                      <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
                    </div>
                  </button>
                </div>

                {/* Abilities */}
                {/* <div className='col-12 mt-2'>
                  <h6>{disabled ? '' : 'Abilities:'}</h6>
                </div>
                <div className='selectedPokemonAbilities p-0 col col-12'>
                  <div className='row'>
                  {
                    disabled ? null : pokemon?.abilities?.map((ability, index) => {
                      return (
                        <div key={index} className='col col-6 text-center'>
                          <p className='p-0 m-0'>{ability.ability.name}</p>
                        </div>
                      )
                    })
                  }
                  </div>
                </div> */}
              </div>

              {/* Stats */}
              <div className="col col-6">
                <div className="row justify-content-between gy-2">
                  <div className="col col-12">
                    {disabled ? null : <PokemonStats pokemon={pokemon} variant={true}/>}
                  </div>
                </div>
              </div>
            </div>
            
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
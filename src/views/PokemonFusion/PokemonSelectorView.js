import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import { useLoadPokemon, useSpecies, useEvolutionChain, usePokemonBySpecies } from '../../services/hook';
// import PokemonStats from '../PokemonDetails/PokemonStats';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faMagnifyingGlassPlus, faInfoCircle, faClose, faShuffle, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import PokemonTypes from '../TypeImages/PokemonTypeImage';

export default function PokemonSelectorView({pokemonID, onSelect, onFind}) {

  const [evIndex, setEvIndex] = useState(null);
  
  const pokemonIDs = useSelector(state => state.pokemonInfo.map(p => p.getID()));

  const pokemon = useLoadPokemon(pokemonID);
  const species = useSpecies(pokemon?.getSpeciesID(), true);
  const evolution = useEvolutionChain(species?.getEvolutionID(), true);

  const evolutionSpeciesIDs = evolution?.getSpeciesIDs();
  const [evolutionSpeciesMap, loadedSpeciesMap] = usePokemonBySpecies(evolutionSpeciesIDs ?? [], true);

  const disabled = pokemon == null;
  const pokemonIDTitle = pokemon?.getGameID() == null ? 'Select a Pokemon' : `No. ${pokemon?.getGameID() ?? '-'}`;

  // Set evolution index
  useEffect(() => {
    
    if(loadedSpeciesMap){
      // Set the evolution index
      const index = getPokemonEvolutionIndex();
      console.log(index);
      setEvIndex(index);
    }
    else{
      setEvIndex(null);
    }

  }, [loadedSpeciesMap, pokemonID]);

  function getPokemonTypeColor() {
    if(pokemon == null){
      return ''
    };

    const typeOne = pokemon.getFirstType();
    // console.log(typeOne);
    return `typeBackground-${typeOne}`;

  }
  
  function getPokemonEvolutionIndex() {
    for (let i = 0; i < evolution?.chain?.length ?? 0; i++) {
      const evolutionChain = evolution.chain[i];
      for (let j = 0; j < evolutionChain.length; j++) {
        const ev = evolutionChain[j];
        const [species, poke] = evolutionSpeciesMap[ev.speciesID];
        if(poke.id === pokemonID){
          return i;
        }
      }
    }

    return null;
  }

  function selectEvolution(pokeEvolution){
    if(loadedSpeciesMap){
      const [species, poke] = evolutionSpeciesMap[pokeEvolution.speciesID];
      onSelect(poke.id);
    }
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
        <tr><th colSpan="4" className='text-capitalize'>{pokemonIDTitle}</th></tr>
      </thead>
      <tbody>
        <tr className=''>
          <td colSpan="2" className='p-3'>
            <div className="row">

              {/* Image and Type */}
              
              <div className="col col-6">
                <div className="row justify-content-between gy-2">

                  {/* Remove Button */}
                  <div className="col-12 d-flex justify-content-start align-items-center mb-1">
                    {
                      disabled ? null : 
                      <button 
                        onClick={removeSelection}
                        disabled={disabled} 
                        type="button" 
                        className="btn btn-sm btn-outline-danger me-3"
                      >
                        <div className='px-1'>
                          <FontAwesomeIcon icon={faClose} color={'$danger'} />
                        </div>
                      </button>
                    }

                    {/* Pokemon Name */}
                    <h5 className='text-capitalize p-0 m-0'>{pokemon?.name}</h5>
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
                          <PokemonTypes pokemon={pokemon} variant={true} />
                        </div>
                      </>
                    }
                  </div>
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
              {/* Stats */}
                  {/* <div className="col col-12">
                    {disabled ? null : <PokemonStats pokemon={pokemon} variant={true}/>}
                  </div> */}
              </div>

              {/* Buttons */}
              <div className="col col-6 align-items-start d-flex my-5">
                <div className="row m-0 justify-content-around w-100 gy-2">

                  {/* Info Button */}
                  {
                    disabled ? null : 
                    <a 
                      type="button" 
                      className="btn col-3 btn-outline-info" 
                      href={`/poke-fusion-dex/pokemon/${pokemonID}`} 
                    >
                      <div className='p-2'>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                      </div>
                    </a>
                  }

                  {/* Shuffle Button */}
                  <button type="button" className="btn col-3 btn-outline-primary" onClick={shuffleSelection}>
                    <div className='p-2'>
                      <FontAwesomeIcon icon={faShuffle} />
                    </div>
                  </button>

                  {/* Selector Button */}
                  <button type="button" className="btn col-3 btn-outline-warning" onClick={onFind}>
                    <div className='p-2'>
                      <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
                    </div>
                  </button>

                  {/* Evolution Buttons */}
                  {
                    disabled || evIndex == null ? null : evolution.chain.map((e, i) => {
                      return Math.abs(evIndex - i) != 1 ? (<></>) : [
                        ...e.map((ch, j) => {
                          return (
                            <button key={`${i}-${j}`} type="button" className={`btn col-10 btn-outline-${i > evIndex ? 'success' : 'danger'}`} onClick={(_) => selectEvolution(ch)}>
                              <div className='p-2'>
                                <FontAwesomeIcon icon={i > evIndex ? faArrowUp : faArrowDown} />
                                <strong className='ms-1 m-0 p-0 text-capitalize'>{ch.name}</strong>
                              </div>
                            </button>
                          )
                        })
                      ]
                    })
                  }

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
import React, { useContext, useState } from 'react'
import { Pokemon } from '../models/pokemon';
import PokedexContext from '../state/PokedexContext';
import PokemonListItem from './PokemonListItem';
import './PokemonList.css';

export default function PokemonList({ pokemon }) {

  // Items on a page
  const pageCount = 150;

  const pokedex = useContext(PokedexContext);

  const [pokeMap, setPokeMap] = useState(pokemon.reduce((map, p) => {
    map[p.id] = null;
    return map;
  }));

  // The state for the current page
  const [page, setPage] = useState(0);

  async function loadDataForPokemonWithID(id) {
    if(pokeMap[id] == null){
      try {
        const result = await pokedex.getPokemonByName(parseInt(id));
        setPokeMap(updateMapwithResults(result, id));
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('Data loaded for pokemon with id: ' + id);
    }
  }

  function updateMapwithResults(result, id){
    return map => {
      const newPokemon = Pokemon.from(result)
      const newMap = {...map};
      newMap[id] = newPokemon;
      return newMap;
    };
  }

  function getItemFromID(map, id){
    return map[id];
  }

  function getLastPageCount(){
    return Math.floor(pokemon.length / pageCount);
  }

  function prevPage() {
    if(page != 0){
      setPage(page - 1);
    }
  }

  function nextPage() {
    if(page != getLastPageCount()){
      setPage(page + 1);
    }
  }

  return (
    <div>

    <div className="grid-container">
        {pokemon.slice(page * pageCount, (page * pageCount) + pageCount).map(p => (
          <PokemonListItem 
            key={p.getID()} 
            pokemonInfo={p} 
            pokemon={getItemFromID(pokeMap, p.getID())} 
            loadData={loadDataForPokemonWithID} 
          />
      ))}
    </div>

    <div>
      <button disabled={page == 0} onClick={prevPage}>Back</button>
      <button disabled={page == getLastPageCount()} onClick={nextPage}>Next</button>
    </div>

    </div>
  )
}

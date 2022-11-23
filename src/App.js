import React, { createContext, useContext, useEffect, useState } from 'react'
import PokemonList from './views/PokemonList'
import PokedexContext from './state/PokedexContext'
import Pokedex from 'pokedex-promise-v2';
import {PokemonInfo} from './models/pokemon';

export default function App() {

  //Hooks
  
  // pokedex api variable
  const pokedex = new Pokedex();

  // pokemon list state
  const [pokemon, setPokemon] = useState([]);
  
  // Get the pokemon when the state reloads
  useEffect(() => {
    getPokemon();
  }, []);
  
  //Helpers

  // Retreives the pokemon and aplies them to the state
  async function getPokemon() {
    try {
      const result = await pokedex.getPokemonsList();
      const pokemonList = result.results.map(e => PokemonInfo.from(e));
      console.log(pokemonList);
      setPokemon(pokemonList);
    } catch (error) {
      console.error(error);
    }
  }
  
  // Build

  return (
    <>
      <PokedexContext.Provider value={pokedex}>
        {
          pokemon.length != 0 ?
          <PokemonList pokemon={pokemon} /> : null
        }
      </PokedexContext.Provider>
    </>
  )
}

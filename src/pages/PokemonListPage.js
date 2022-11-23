import PokemonList from '../views/PokemonList/PokemonList';
import React from 'react'
import { useSelector } from 'react-redux';

export default function PokemonListPage() {

  const pokemon = useSelector(state => state.pokemonInfo);

  return (
    <>
        {pokemon.length != 0 ? <PokemonList pokemon={pokemon} /> : null}
    </>
  )
}

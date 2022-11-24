import PaginatedPokemonList from '../views/PokemonList/PaginatedPokemonList';
import React from 'react'
import { useSelector } from 'react-redux';

export default function PokemonListPage() {

  const pokemon = useSelector(state => state.pokemonInfo);

  return (
    <>
        {pokemon.length != 0 ? <PaginatedPokemonList pokemon={pokemon} /> : null}
    </>
  )
}

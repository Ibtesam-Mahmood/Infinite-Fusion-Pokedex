import PaginatedPokemonList from '../views/PokemonList/PaginatedPokemonList';
import React from 'react'
import { useSelector } from 'react-redux';
import SiteLogo from "../views/SiteLogo";

export default function PokemonListPage() {

  const pokemon = useSelector(state => state.pokemonInfo);

  return (
    <>
      <SiteLogo/>
      {pokemon.length != 0 ? <PaginatedPokemonList pokemon={pokemon} /> : null}
    </>
  )
}

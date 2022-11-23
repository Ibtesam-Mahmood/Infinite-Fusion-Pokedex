import React from 'react'

export default function PokemonListPage({pokemon}) {
  return (
    <>
        {pokemon.length != 0 ? <PokemonList pokemon={pokemon} /> : null}
    </>
  )
}

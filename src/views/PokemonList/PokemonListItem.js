import React, { useEffect } from 'react'

export default function PokemonListItem({ pokemonInfo, pokemon, loadData }) {

  useEffect(() => {
    if(pokemon == null && loadData != null){
      loadData(pokemonInfo.id);
    }
  }, []);

  return (
    <div className="grid-item">
      {(pokemon != null && pokemon.sprites != null ? <img src={pokemon.sprites.front_default} /> : null)}
        <p>
            {pokemonInfo.name}
        </p>
    </div>
  )
}

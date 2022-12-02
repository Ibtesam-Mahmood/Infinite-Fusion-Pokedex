import React from 'react'
import PokemonTypeImage from "../TypeImages/PokemonTypeImage";
import { Link } from 'react-router-dom';


export default function PokemonImageToken({pokemon}) {

  const typeBackgroundClass = pokemon == null ? '' : `typeBackground-${pokemon.getFirstType()}`;

  return (
    pokemon == null ? null :
    <Link to={`/poke-fusion-dex/pokemon/${pokemon.id}`} style={{ textDecoration: 'none' }}>
      <div className='pokemonToken container p-0'>
        <div className={`${typeBackgroundClass} pokemonTokenImg m-2`}>
          <img className='img-fluid' src={pokemon?.sprites?.front_default} alt={pokemon?.name}/>
        </div>
        <div className='pokemonName pt-1'>
          <h6 className='text-capitalize container p-0 m-0 pb-2'>{pokemon.getGameID()}. {pokemon?.name}</h6>
          <PokemonTypeImage pokemon={pokemon} maxHeight='20px'/>
        </div>
      </div>
    </Link>
  )
}

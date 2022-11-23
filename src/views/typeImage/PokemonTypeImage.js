import React from 'react'
import TypeImageView from './TypeImageView';

export default function PokemonTypeImage({pokemon}) {

  const typeOne = () => pokemon.types[0].type.name;
  const typeTwo = () => pokemon.types.length > 1 ? pokemon.types[1].type.name : null;

  return (
    pokemon == null ? null : <TypeImageView typeOne={typeOne()} typeTwo={typeTwo()} />
  )
}


import React from 'react'
import TypeImageView from './TypeImageView';

export default function PokemonTypeImage({pokemon}) {

  const typeOne = () => pokemon.getFirstType();
  const typeTwo = () => pokemon.getSecondType();

  return (
    pokemon == null ? null : <TypeImageView typeOne={typeOne()} typeTwo={typeTwo()} />
  )
}


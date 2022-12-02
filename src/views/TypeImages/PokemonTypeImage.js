import React from 'react'
import TypeImageView from './TypeImageView';

export default function PokemonTypeImage({pokemon = null, maxHeight = '20px'}) {

  const typeOne = () => pokemon.getFirstType();
  const typeTwo = () => pokemon.getSecondType();

  return (
    pokemon == null ? null : <TypeImageView maxHeight={maxHeight} typeOne={typeOne()} typeTwo={typeTwo()} />
  )
}


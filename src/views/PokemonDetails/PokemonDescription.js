import React from 'react'
import PokemonAbilities from './PokemonAbilities';

import '../../styles/PokemonStats.scss';

export default function PokemonDescription({pokemon, species}) {

  const desciption = species?.description ?? '';

  return (
    <div style={{minHeight: '10vh'}} className='statsContainer container py-1'>
      <div className='pb-1'>
        <h5>Description</h5>
        <h6 className='descriptionText'>{desciption}</h6>
      </div>
      <div className=''>
        <h5>Abilities</h5>
        <PokemonAbilities pokemon={pokemon} />
      </div>
    </div>
  )
}

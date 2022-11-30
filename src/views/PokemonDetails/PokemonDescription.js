import React from 'react'

import '../../styles/PokemonStats.scss';

export default function PokemonDescription({species}) {

  const desciption = species?.description ?? '';

  return (
    <div style={{minHeight: '10vh'}} className='statsContainer container py-1'>
      <h5>Description</h5>
      <h6 className='descriptionText'>{desciption}</h6>
    </div>
  )
}

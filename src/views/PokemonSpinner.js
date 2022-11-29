import React from 'react'

import '../styles/PokemonSpinner.scss';

export default function PokemonSpinner({scale = null}) {
  return (
    <div className='d-inline-flex' style={{transform: `scale(${scale ?? 1})`}}>
        <div className='pokemonLoadingSpinner'></div>
    </div>
  )
}

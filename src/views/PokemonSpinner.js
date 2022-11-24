import React from 'react'

import '../styles/PokemonSpinner.scss';

export default function PokemonSpinner() {
  return (
    <div className='d-inline-flex'>
        <div className='pokemonLoadingSpinner'></div>
    </div>
  )
}

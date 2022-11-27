import React from 'react'

export default function PokemonMoveListItem({moveInfo}) {
  return (
    <div className='move'>
      <p>{moveInfo.move.name}</p>
    </div>
  )
}

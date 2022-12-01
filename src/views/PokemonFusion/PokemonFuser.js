import React from 'react'
import FusemonImageToken from './FusemonImageToken';
import { useFusemon } from '../../services/hook'

export default function PokemonFuser({fuse1, fuse2}) {

  const fusemon = useFusemon([fuse1, fuse2]);
  // console.log(fusemon);
  
  return (
    <div className='fuserRoot'>
      {fusemon == null ? null : <FusemonImageToken className='fusemonToken' fusemon={fusemon}/>}
    </div>
  )
}

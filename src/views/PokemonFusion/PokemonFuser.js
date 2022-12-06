import React from 'react'
import FusemonImageToken from './FusemonImageToken';
import PokemonStats from '../PokemonDetails/PokemonStats';
import PokemonTypeEffectiveness from '../PokemonDetails/PokemonTypeEffectiveness';
import { useFusemon } from '../../services/hook'

export default function PokemonFuser({fuse1, fuse2}) {

  const fusemon = useFusemon([fuse1, fuse2]);
  // console.log(fusemon);
  
  return (
    <div className='fuserRoot'>
      {fusemon == null ? null : <div className='row'>
        <div className='col align-items-center d-flex col col-lg-4 col-md-6 col-6'>
          <FusemonImageToken className='fusemonToken' fusemon={fusemon}/>
        </div>
        <div className='col align-items-center d-flex col col-lg-4 col-md-6 col-6 p-2'>
          <PokemonStats className='fusemonToken' pokemon={fusemon}/>
        </div>
        <div className='col align-items-center d-flex col col-lg-4 col-md-12 col-12 p-2'>
          <PokemonTypeEffectiveness className='fusemonToken' pokemon={fusemon}/>
        </div>
      </div>}
    </div>
  )
}

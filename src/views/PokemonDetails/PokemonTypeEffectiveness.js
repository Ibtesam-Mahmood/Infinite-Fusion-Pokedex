import React from 'react'
import PokemonSpinner from '../PokemonSpinner';
import EffectivenessTable from './EffectivenessTable';
import { TypeEffectiveness } from '../../services/constants';

import '../../styles/PokemonStats.scss';

export default function PokemonTypeEffectiveness({pokemon}) {

  const [typeOne, typeTwo] = [pokemon?.getFirstType(), pokemon?.getSecondType()];
  let effectiveness = null;

  if(typeOne != null || typeTwo != null){
    const effList = TypeEffectiveness.getEffectiveness({types: [typeOne, typeTwo]});
    effectiveness = TypeEffectiveness.sortEffectiveness(effList);
  }
  

  return (
    <div className='statsContainer container py-1'>
      <h5>Type Effectiveness</h5>
      {
        effectiveness == null ? <PokemonSpinner scale={0.5} /> : 
        <EffectivenessTable sorted={effectiveness}/>
      }
    </div>
  )
}

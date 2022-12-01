import React from 'react'

import '../../styles/PokemonStats.scss';
import StatProgressBar from './StatProgressBar';

export default function PokemonStats({pokemon, variant = false}) {

  const stats = pokemon != null ? pokemon.stats : null;
  const statMap = {
    hp: 0,
    attack: 0,
    defense: 0,
    'special-attack': 0,
    'special-defense': 0,
    speed: 0
  };
  // console.log(abilities)

  // Itterate through the stats and add them to the statMap
  if(stats != null){
    stats.forEach(stat => {
      statMap[stat.stat.name] = stat.base_stat;
    });
  }

  return (
    <div className={`statsContainer ${variant ? 'variantContainer' : ''} container py-1`}>
      <div className='row'>
        <h5 className='col col-12'>Base stats</h5>
        <StatProgressBar className='col col-12' value={statMap.hp} title='HP' color={'warning'}/>
        <StatProgressBar className='col col-12' value={statMap.attack} title='Attack' color={'danger'}/>
        <StatProgressBar className='col col-12' value={statMap.defense} title='Defense' color={'success'}/>
        <StatProgressBar className='col col-12' value={statMap['special-attack']} title='Sp. Atk' color={'primary'}/>
        <StatProgressBar className='col col-12' value={statMap['special-defense']} title='Sp. Def' color={'secondary'}/>
        <StatProgressBar className='col col-12' value={statMap.speed} title='Speed' color={'info'}/>
      </div>
    </div>
  )
}

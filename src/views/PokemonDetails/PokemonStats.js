import React from 'react'

import '../../styles/PokemonStats.scss';
import StatProgressBar from './StatProgressBar';

export default function PokemonStats({pokemon}) {

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
    <div className='statsContainer container py-1'>
      <div>
        <h5>Base stats</h5>
        <StatProgressBar value={statMap.hp} title='HP' />
        <StatProgressBar value={statMap.attack} title='Attack' />
        <StatProgressBar value={statMap.defense} title='Defense' />
        <StatProgressBar value={statMap['special-attack']} title='Sp. Attack' />
        <StatProgressBar value={statMap['special-defense']} title='Sp. Defense' />
        <StatProgressBar value={statMap.speed} title='Speed' />
      </div>
    </div>
  )
}

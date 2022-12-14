import React from 'react'

export default function PokemonMoveListItem({moveInfo, move}) {

  const eggLearnMethod = move.details.move_learn_method.name === 'egg';
  const type = moveInfo.type.name;
  const damageClass = moveInfo.damage_class.name;

  return (
    <tr className='moveItem'>
      <td className='moveMethod'>{eggLearnMethod ? 'egg' : move.details.level_learned_at}</td>
      <td className='moveName ps-1'>{moveInfo.name}</td>
      <td className={`typeBackground-${type} text-capitalize`}>{type}</td>
      <td className={`moveCategory ${damageClass}`}>{damageClass}</td>
      <td>{moveInfo.power ?? '-'}</td>
      <td>{moveInfo.accuracy ?? '-'}%</td>
      <td>{moveInfo.pp ?? '-'}</td>
    </tr>
  )
}

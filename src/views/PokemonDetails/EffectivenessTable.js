import React from 'react';
import { TypeEffectiveness, TypeImages } from '../../services/constants';

export default function EffectivenessTable({sorted, list}) {

  if(sorted == null && list == null){
    return (<></>); // break
  }

  const effectiveness = sorted ?? TypeEffectiveness.sortEffectiveness(list);
  const keys = Object.keys(effectiveness);

  function getTypeImg(type) {
    return (
      <img 
        className='img-fluid typeImage pe-1' 
        src={TypeImages.get(type)} 
        alt={`${type} image`}
        key={`${type}-image`}
      />
    );
  }

  return (
    <table className='effectivenessTable'>
      
      {
        keys.map(k => {

          const title = k.replace('_', '.');
          const types = effectiveness[k];
          
          return (
            <tbody key={`effectivenessRow-${k}`}>
              <tr className='py-2'>
                <td className='effTitle px-2'>{title}</td>
                <td className='effTypes'>{types.map(t => getTypeImg(t))}</td>
              </tr>
            </tbody>
          )
        })
      }

      
    </table>
  )
}

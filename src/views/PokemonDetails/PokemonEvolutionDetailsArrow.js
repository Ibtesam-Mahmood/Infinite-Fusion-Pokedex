import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faArrowDownLong, faArrowTurnDown } from '@fortawesome/free-solid-svg-icons';

export default function PokemonEvolutionDetailsArrow({details, variant = false}) {
  
  let reason = '';

  // console.log(details);
  if(details.trigger.name === 'level-up'){
    reason = `Level ${details.min_level}`;
  } else if(details.trigger.name === 'use-item'){
    reason = `Use ${details.item.name}`;
  } else if(details.trigger.name === 'trade'){
    reason = `Trade`;
  } else if(details.trigger.name === 'shed'){
    reason = `Shed`;
  } else if(details.trigger.name === 'other'){
    reason = `Other`;
  }

  // console.log(reason);

  return (
    <div className='py-1 container w-60'>
        <div className='row align-items-center'>
            <FontAwesomeIcon className='col col-6 p-0' icon={faArrowDownLong} />
            <p className='col col-6 p-0 m-0'>{reason}</p>
        </div>
    </div>
  )
}

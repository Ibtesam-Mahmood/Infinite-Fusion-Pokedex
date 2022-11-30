import React, { useRef } from 'react'
import { useHover } from 'usehooks-ts';
import { useAbilities } from '../../services/hook';

import '../../styles/PokemonStats.scss';

export default function PokemonAbilities({pokemon}) {

  const hoverRef = useRef(null);
  const hovered = useHover(hoverRef);

  let abilities = pokemon != null ? pokemon.abilities : [];
  // console.log(abilities);
  const abilityIds = abilities.map(getAbilityID);
  
  const [abilitiesMap, loaded] = useAbilities(abilityIds, true);

  function getAbilityID(ability) { return ability.ability.url.split('/').reverse()[1]; }

  return (
    <table className='abilitiesTable'>
      <tbody>
        <tr ref={hoverRef}>
        {
          abilities.map(ability => {

            const hidden = ability.is_hidden;
            const info = abilitiesMap[getAbilityID(ability)];

            return (
                <td 
                  key={ability.ability.name} 
                  className={`text-capitalize ${hidden ? 'hiddenAbility' : ''}`}
                >
                  {hidden && !(hovered && loaded) ? <p className='hiddenLabel p-0 m-0'>Hidden</p> : null}
                  <h6 style={{display: hovered && loaded ? 'none' : 'block'}} className='p-0 m-0'>{ability.ability.name}</h6>
                  <p style={{display: hovered && loaded ? 'block' : 'none'}} className='abilityDescription p-0 m-0'>{info?.description ?? ''}</p>
                </td>
              )
            }
          )
        }
        </tr>
      </tbody>
    </table>
  )
}

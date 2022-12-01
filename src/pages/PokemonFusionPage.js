import React, {useState} from 'react'
import AppNavbar from "../views/AppNavbar";
import PokemonSelector from '../views/PokemonFusion/PokemonSelector';

import '../styles/PokemonFusion.scss';

export default function PokemonFusionPage() {
  
  const [pokemon1, setPokemon1] = useState(1);

  return (
    <div className='fusionPageRoot'>
      <AppNavbar active='fuse'/>

      <div className='row fusionPageBody p-0 m-0'>
        <div className='fusionPageCol col col-12 col-md-4'>
          <div className='row'>
            <div className='fusionPageItem col col-12 p-1'>
              <PokemonSelector selected={pokemon1} onSelect={setPokemon1}/> 
            </div>
            <div className='fusionPageItem col col-12'>

            </div>
          </div>
        </div>
        <div className='fusionPageCol col col-12 col-md-8'>
          <div className='fusionPageFuse'>
            3
          </div>
        </div>
      </div>
    </div>
  )
}

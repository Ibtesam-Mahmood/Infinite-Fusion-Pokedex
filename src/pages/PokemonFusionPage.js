import React, {useState} from 'react'
import AppNavbar from "../views/AppNavbar";
import PokemonSelector from '../views/PokemonFusion/PokemonSelector';
import { useSearchParams, useNavigate } from 'react-router-dom';

import '../styles/PokemonFusion.scss';

export default function PokemonFusionPage() {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const pokemon1Param = parseInt(searchParams.get("idOne"));
  const pokemon2Param = parseInt(searchParams.get("idTwo"));

  const pokemon1 = pokemon1Param ? parseInt(pokemon1Param) : null;
  const pokemon2 = pokemon2Param ? parseInt(pokemon2Param) : null;

  function setPokemonID(id, index){
    const id1 = index === 1 ? id : pokemon1;
    const id2 = index === 2 ? id : pokemon2;

    const id1Param = id1 ? `idOne=${id1}` : '';
    const id2Param = id2 ? `idTwo=${id2}` : '';
    const andParam = id1 && id2 ? '&' : '';

    const navParam = `/poke-fusion-dex/fuse?${id1Param}${andParam}${id2Param}`;

    console.log(navParam);

    setTimeout(() => {
      navigate(navParam);
    }, 100);
  }

  return (
    <div className='fusionPageRoot'>
      <AppNavbar active='fuse'/>

      <div className='row fusionPageBody p-0 m-0'>
        <div className='fusionPageCol col col-12 col-md-4'>
          <div className='row'>
            <div className='fusionPageItem col col-12 p-1'>
              <PokemonSelector selected={pokemon1} onSelect={(id) => setPokemonID(id, 1)}/> 
            </div>
            <div className='fusionPageItem col col-12'>
              <PokemonSelector selected={pokemon2} onSelect={(id) => setPokemonID(id, 2)}/> 
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

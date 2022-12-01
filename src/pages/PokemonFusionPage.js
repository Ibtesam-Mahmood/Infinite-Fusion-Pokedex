import React from 'react'
import {useSelector} from 'react-redux';
import AppNavbar from "../views/AppNavbar";
import PaginatedPokemonList from '../views/PokemonList/PaginatedPokemonList';

import '../styles/PokemonFusion.scss';

export default function PokemonFusionPage() {

  const pokemon = useSelector(state => state.pokemonInfo);

  return (
    <div className='fusionPageRoot'>
      <AppNavbar active='fuse'/>

      <div className='row fusionPageBody p-0 m-0'>
        <div className='fusionPageCol col col-12 col-md-4'>
          <div className='row'>
            <div className='fusionPageItem col col-12'>
            {
                pokemon.length != 0 ? 
                  <PaginatedPokemonList 
                    pokemon={pokemon} 
                    mini={true}
                  /> 
                  : null
              }
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

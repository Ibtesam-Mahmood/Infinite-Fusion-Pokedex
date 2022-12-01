import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import PokemonSelectorView from './PokemonSelectorView';
import PaginatedPokemonList from '../PokemonList/PaginatedPokemonList';

export default function PokemonSelectorList() {

  const pokemonList = useSelector(state => state.pokemonInfo);
  // const [find, setFind] = useState(true);

  return (
    <div className='pb-5'>
      <div className='selectorListRoot'>
      {
        pokemonList.length != 0 ? 
          <PaginatedPokemonList 
            pokemon={pokemonList} 
            mini={true}
          /> 
        : null
      }
    </div>
    </div>
  )
}

{
  
}
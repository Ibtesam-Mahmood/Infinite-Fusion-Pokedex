import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import PokemonSelectorView from './PokemonSelectorView';
import PokemonSelectorList from './PokemonSelectorList';

export default function PokemonSelector({selectedID, onSelect}) {

  const pokemonList = useSelector(state => state.pokemonInfo);
  const [find, setFind] = useState(true);

  return (
    <div className='selectorRoot p-2'>
      {
        find ? <PokemonSelectorList/> : <PokemonSelectorView pokemonID={selectedID} />
      }
    </div>
  )
}

{
  
}
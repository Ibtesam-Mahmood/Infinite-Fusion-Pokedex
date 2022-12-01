import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import PokemonSelectorView from './PokemonSelectorView';
import PokemonSelectorList from './PokemonSelectorList';

export default function PokemonSelector({selected, onSelect}) {

  const pokemonList = useSelector(state => state.pokemonInfo);
  const [find, setFind] = useState(false);

  function handleSelect(id) {
    handleFind(false);
    if(id != null){
      onSelect(id);
    }
  }

  function handleFind(value) {
    setFind(value);
  }

  return (
    <div className='selectorRoot p-0 m-0'>
      {
        find ? <PokemonSelectorList
          onSelect={handleSelect}
        /> : <PokemonSelectorView 
          className='p-2' 
          pokemonID={selected} 
          onFind={() => handleFind(true)} 
          onSelect={handleSelect} 
        />
      }
    </div>
  )
}

{
  
}
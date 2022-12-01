import React, {useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import PokemonSelectorView from './PokemonSelectorView';
import PaginatedPokemonList from '../PokemonList/PaginatedPokemonList';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function PokemonSelectorList({onSelect}) {

  const pokemonList = useSelector(state => state.pokemonInfo);

  const searchRef = useRef(null);
  const [search, setSearch] = useState('');

  function handleSearch(event){
    event.preventDefault();
    // console.log(searchRef.current.value);
    setSearch(searchRef.current.value);
  }

  function close(){
    onSelect(null);
  }

  function selectPokemon(pokemonInfo){
    const id = pokemonInfo?.getID();
    // console.log(id);
    if(id != null){
      onSelect(id);
    }
  }

  return (
    <div className='pb-5'>
      <div className='selectorListRoot py-5 my-5'>
        {
          pokemonList.length != 0 ? 
            <PaginatedPokemonList 
              pokemon={pokemonList} 
              search={search}
              mini={true}
              onItemTap={selectPokemon}
            /> 
          : null
        }
      </div>
      <div className='selectorListFloating p-0 m-0'>
        <div className='floatingHeader p-1'>
          <button 
            onClick={close}
            className="btn btn-outline-danger btn-sm floatingClose" 
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h4 className='p-0 m-0 pb-3'>Pokemon Selector</h4>
        </div>
        <div className='floatingFooter'>
          <form className='floatingFooterForm mx-5 mb-1' onSubmit={handleSearch}>
              <input 
                ref={searchRef}
                type="text" 
                className="form-control form-control-lg" 
                id="search-pokemon" 
                aria-describedby="search-pokemon"
                placeholder="Search Pokemon..."
              />
              <button 
                className="btn btn-primary btn-lg ms-3" 
                type="submit"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
          </form>
        </div>
      </div>
    </div>
  )
}

{
  
}
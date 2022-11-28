import PaginatedPokemonList from '../views/PokemonList/PaginatedPokemonList';
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import SiteLogo from "../views/SiteLogo";

import '../styles/PokemonHeader.scss';

export default function PokemonListPage() {

  const pokemon = useSelector(state => state.pokemonInfo);

  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('');

  const filterOverrideParam = searchParams.get("search");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilterTerm(searchTerm)
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm])

  return (
    <>
      <nav className='navbar sticky-top bg-light justify-content-between px-5'>
        <SiteLogo className='navbar-brand my-auto'/>
        <h2 >Home</h2>
      </nav>

      {/* Header container */}
      <div className='container-fluid pokemonHeader'>
        <div className='pokemonHeaderImage'></div>
        <div className='pokemonHeaderContnet d-flex'>
          <div className='text-center container'>
            <h1>FusionDex</h1>
            <h6>Created by <a href='https://github.com/Ibtesam-Mahmood'>Ibtesam-Mahmood</a> as a tool to use when playing Pokemon Infinite Fusion (v5.0). The tool itself is based off of <a href='https://aegide.github.io'>The Infinite Fusion Calculator</a> Created by <a href='https://github.com/Aegide/Aegide.github.io'>Aegide/SDM0</a>. Hopefully it can be useful to you.</h6>
            
            {/* Search Box */}
            <div className='d-flex justify-content-center'>
              <div className="input-group input-group-lg py-4 w-50">
                <input 
                  type="text" 
                  className="form-control searchPokemon" 
                  aria-label="Large" 
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder='Search Pokemon...'
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        pokemon.length != 0 ? 
          <PaginatedPokemonList 
            pokemon={pokemon} 
            search={filterOverrideParam ?? filterTerm} 
          /> 
          : null
      }
    </>
  )
}

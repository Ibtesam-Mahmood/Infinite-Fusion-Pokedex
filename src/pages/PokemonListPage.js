import PaginatedPokemonList from '../views/PokemonList/PaginatedPokemonList';
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import SiteLogo from "../views/SiteLogo";

import '../styles/PokemonHeader.scss';

export default function PokemonListPage() {

  const pokemon = useSelector(state => state.pokemonInfo);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('');

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
            <h6>Created by <a href='https://github.com/Ibtesam-Mahmood'>Ibtesam-Mahmood</a> as a tool to use when playing Pokemon Infinite Fusion (v5.0). Hopefully it can be useful to you too.</h6>
            
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

      {pokemon.length != 0 ? <PaginatedPokemonList pokemon={pokemon} search={filterTerm} /> : null}
    </>
  )
}

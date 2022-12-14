import PaginatedPokemonList from '../views/PokemonList/PaginatedPokemonList';
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import AppNavbar from "../views/AppNavbar";
import ToastyWrapper from "../views/ToastyWrapper";

import '../styles/PokemonHeader.scss';

export default function PokemonListPage() {

  const pokemon = useSelector(state => state.pokemonInfo);
  
  const [searchParams] = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
  
  const filterOverrideParam = searchParams.get("search");
  
  const [showSearch, setShowSearch] = useState(false);
  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilterTerm(searchTerm)
    }, 1000);
    
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
    
  const handleScroll = () => {
      const position = window.pageYOffset;
      setShowSearch(position > 360);
  };

  return (
    <div className='homeRoot'>

      <AppNavbar showSearch={showSearch} active={'home'} />

      {/* Header container */}
      <ToastyWrapper>
        <div className='container-fluid pokemonHeader'>
          <div className='pokemonHeaderImage'></div>
          <div className='pokemonHeaderContnet d-flex'>
            <div className='text-center'>
              <h1>FusionDex</h1>
              <h6 className='container'>
                Created by <a href='https://github.com/Ibtesam-Mahmood'>Ibtesam-Mahmood</a> as a tool to use when playing Pokemon Infinite Fusion (v5.0). 
                The tool itself is based off of <a href='https://aegide.github.io'>The Infinite Fusion Calculator</a> Created by <a href='https://github.com/Aegide/Aegide.github.io'>Aegide/SDM0</a>.
                Hopefully you find this tool fun, if not useful.
                <br/><br/>
                All the official pokemon sprites shown on this website are directly from the <a href='https://pokeapi.co'>PokeAPI</a>. 
                While the fusion sprites on the website are sourced through Aegide's repository on github, 
                  which were orignally created by members of the Infite Fusion 
                  <a href='https://discord.com/invite/2yynWRvBrB'> Discord</a> and 
                  <a href='https://www.reddit.com/r/PokemonInfiniteFusion/'> Reddit</a> Communities.
              </h6>
              
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
      </ToastyWrapper>

      {
        pokemon.length != 0 ? 
          <PaginatedPokemonList 
            pokemon={pokemon} 
            search={filterOverrideParam ?? filterTerm} 
          /> 
          : null
      }
    </div>
  )
}

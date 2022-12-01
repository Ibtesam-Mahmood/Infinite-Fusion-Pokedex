import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SiteLogo from './SiteLogo';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function AppNavbar({title, showSearch = true, active}) {

  const searchRef = useRef();
  const navigate = useNavigate();

  const pokemonIDs = useSelector(state => state.pokemonInfo.map(p => p.getID()));
  // console.log(pokemonIDs);
  
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      navigateToSearch(e.target.value);
    }
  }
  
  function navigateToSearch(term){
    if(term != ''){
      // console.log(term);
      navigate(`/poke-fusion-dex?search=${term}`);
    }
  }

  function randomPokemonUrl() {
    const randomID = pokemonIDs[Math.floor(Math.random() * pokemonIDs.length)];
    return `/poke-fusion-dex/pokemon/${randomID}`;
  }

  function randomFusionUrl() {
    const randomID1 = pokemonIDs[Math.floor(Math.random() * pokemonIDs.length)];
    const randomID2 = pokemonIDs[Math.floor(Math.random() * pokemonIDs.length)];
    return `/poke-fusion-dex/fuse?idOne=${randomID1}&idTwo=${randomID2}&fuse=true`;
  }
  
  function randUrl(){
    const randUrl = Math.random() > 0.5 ? randomPokemonUrl() : randomFusionUrl();
    return randUrl
  }

  const navItems = {
    'Home': () => '/poke-fusion-dex',
    'Fuse': () => '/poke-fusion-dex/fuse',
    'Feeling Lucky': randUrl,
    // 'Random Fusion': randomFusionUrl,
    // 'About': () => '/poke-fusion-dex/about',
  };

  return (
    <nav className='appNavBar navbar navbar-expand-lg navbar-dark sticky-top px-4'>
      <SiteLogo className='appNavBarImg navbar-brand my-auto'/>
      <div className="appBarTitle navbar-expand">
        <h3 className='m-0 p-0 text-capitalize'>{title}</h3>
      </div>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
          {
            Object.keys(navItems).map((item, index) => {
              const isActive = item.toLowerCase() == active;
              return (
                <li key={index} className="nav-item px-2">
                  <a className={`nav-link ${isActive ? 'active' : ''}`} href={navItems[item]()}>
                    {item}
                    {isActive ? <span className="sr-only">(current)</span> : null}
                  </a>
                </li>
              )
            })
          }
          {/* <li className="nav-item dropdown px-2">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Randomize
            </a>
            <div className="dropdown-menu" style={{ margin: 0 }} id="dropdown" aria-labelledby="navbarDropdownMenuLink">
              <a className="dropdown-item" href={randomPokemonUrl()}>Random Pokemon</a>
              <a className="dropdown-item" href={randomFusionUrl()}>Random Fusion</a>
            </div>
          </li> */}
        </ul>
        
        {/* Search */}
        <div className='appNavBarSearch ms-auto' style={{display: showSearch ? 'block' : 'none'}}>
          <div className="input-group input-group-sm align-items-center">
            <input 
              ref={searchRef}
              style={{"width":"200px"}}
              type="text" 
              className="form-control searchPokemon" 
              aria-describedby="inputGroup-sizing-sm"
              placeholder='Search Pokemon...'
              onKeyDown={handleKeyDown}
            />
            <div className="input-group-append ms-1">
              <button 
                className="btn btn-outline-primary btn-sm" 
                type="submit" 
                onClick={() => navigateToSearch(searchRef.current.value)}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

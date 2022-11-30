import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import loadPokemonThunkAction from '../state/InfinitePokedexStore/thunk/loadPokemonThunkAction';
import {Row, Col} from 'react-bootstrap';
import SiteLogo from "../views/SiteLogo";
import {useLoadPokemon, useEvolutionChain, useSpecies} from '../services/hook';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import PokemonStats from '../views/PokemonDetails/PokemonStats';
import PokemonDescription from '../views/PokemonDetails/PokemonDescription';
import PokemonEvolutionDetails from '../views/PokemonDetails/PokemonEvolutionDetails';
import PokemonLocation from '../views/PokemonDetails/PokemonLocation';
import PokemonTypeEffectiveness from '../views/PokemonDetails/PokemonTypeEffectiveness';
import PokemonMoves from '../views/PokemonDetails/PokemonMoves';
import PokemonTypeImage from "../views/typeImage/PokemonTypeImage";

import '../styles/PokemonDetails.scss';

export default function PokemonDetailsPage() {

  const navigate = useNavigate();

  const {id} = useParams();
  const pokemon = useLoadPokemon(id);
  const species = useSpecies(pokemon?.getSpeciesID(), true);
  const evolution = useEvolutionChain(species?.getEvolutionID(), true);

  const searchRef = useRef();

  // console.log(pokemon);
  // console.log(species);
  // console.log(evolution);
  // console.log('-------');

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

  function getPokemonTypeColor() {
    if(pokemon == null){
      return ''
    };

    const typeOne = pokemon.getFirstType();
    // console.log(typeOne);
    return `typeBackground-${typeOne}`;

  }

  return (
    <div className='detailsRoot'>
      <nav className='navbar sticky-top bg-light justify-content-between px-5'>

        <SiteLogo className='navbar-brand my-auto'/>
        {(
          pokemon == null ? <div className='placeholder'/> 
          : <h2 className='text-capitalize'>{pokemon.name}</h2>
        )}

        {/* Search Bar */}
        <div className=''>
          <div className="input-group input-group-sm align-items-center">
            <input 
              ref={searchRef}
              style={{"width":"25vw"}}
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

      </nav>
      
      <Row className='detailsBody w-100'>
        <Col sm={12} md={6} lg={4} xl={3} className='detailsBodyCol'>
          <Row className='detailsBodyRow'>
            
            {/* Pokemon Image */}
            <Col sm={12} className='detailsBodyItem px-2 pt-2 pb-2'>
              <img
                className={`${getPokemonTypeColor()} pokemonDetailImage img-fluid conatiner`} 
                src={pokemon?.sprites?.other['official-artwork']?.front_default ?? pokemon?.sprites?.front_default} 
                alt={pokemon?.name}
                />
            </Col>

            {/* Pokemon Type and Name */}
            <Col sm={12} className='detailsBodyItem p-1 pb-2 container'>
              <div className='outlineContainer pokemonNumber px-3 py-0'>#{pokemon?.getGameID()}</div>
              <div className='outlineContainer text-capitalize pokemonName px-3 py-0'>{pokemon?.name}</div>
            </Col>
            <Col sm={12} className='detailsBodyItem pb-2 p-1 justify-content-center container'>
              <PokemonTypeImage pokemon={pokemon} maxHeight='40px'/>
            </Col>

            
            {/* Pokemon Stats */}
            <Col sm={12} className='detailsBodyItem p-1'>
              <PokemonStats pokemon={pokemon} />
            </Col>
          </Row>
        </Col>
        
        <Col sm={12} md={6} lg={4} xl={3} className='detailsBodyCol'>
          <Row className='detailsBodyRow'>
            {/* Pokemon Description */}
            <Col sm={12} className='detailsBodyItem p-1'>
              <PokemonDescription pokemon={pokemon} species={species} />
            </Col>

            {/* Pokemon Moves */}
            <Col sm={12} className='detailsBodyItem p-1'>
              <PokemonMoves pokemon={pokemon} />
            </Col>
          </Row>
        </Col>

        {/* Pokemon Evolution*/}
        <Col sm={12} md={6} lg={4} xl={3} className='detailsBodyCol p-1'>
            <PokemonEvolutionDetails className='detailsBodyItem'  evolution={evolution} />
        </Col>

        
        <Col sm={12} md={6} lg={4} xl={3} className='detailsBodyCol'>
          <Row className='detailsBodyRow'>

            {/* Pokemon Tyoe Effectiveness */}
            <Col sm={12} className='detailsBodyItem p-1'>
              <PokemonTypeEffectiveness pokemon={pokemon} />
            </Col>

            {/* Pokemon Location */}
            <Col sm={12} className='detailsBodyItem p-1'>
              <PokemonLocation pokemon={pokemon} evolution={evolution} />
            </Col>
            {/* <Col sm={12} className='debug detailsBodyItem'></Col> */}
          </Row>
        </Col>
      </Row>
    </div>
    // <div>
    //   {(
    //     pokemon != null ? <>
    //       {(pokemon.sprites != null ? <img src={pokemon.sprites.front_default} /> : null)}
    //       {(pokemon != null ? <p>{JSON.stringify(pokemon)}</p> : null)}
    //     </> : null
    //   )}
    // </div>
  )
}

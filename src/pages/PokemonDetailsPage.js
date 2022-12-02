import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import loadPokemonThunkAction from '../state/InfinitePokedexStore/thunk/loadPokemonThunkAction';
import {Row, Col} from 'react-bootstrap';
import SiteLogo from "../views/SiteLogo";
import {useLoadPokemon, useEvolutionChain, useSpecies} from '../services/hook';
import PokemonStats from '../views/PokemonDetails/PokemonStats';
import PokemonDescription from '../views/PokemonDetails/PokemonDescription';
import PokemonEvolutionDetails from '../views/PokemonDetails/PokemonEvolutionDetails';
import PokemonLocation from '../views/PokemonDetails/PokemonLocation';
import PokemonTypeEffectiveness from '../views/PokemonDetails/PokemonTypeEffectiveness';
import PokemonMoves from '../views/PokemonDetails/PokemonMoves';
import PokemonTypeImage from "../views/TypeImages/PokemonTypeImage";
import AppNavbar from "../views/AppNavbar";

import '../styles/PokemonDetails.scss';

export default function PokemonDetailsPage() {

  const navigate = useNavigate();
  const {id} = useParams();

  const pokemon = useLoadPokemon(id);
  const species = useSpecies(pokemon?.getSpeciesID(), true);
  const evolution = useEvolutionChain(species?.getEvolutionID(), true);

  // console.log(pokemon);
  // console.log(species);
  // console.log(evolution);
  // console.log('-------');

  function getPokemonTypeColor() {
    if(pokemon == null){
      return ''
    };

    const typeOne = pokemon.getFirstType();
    // console.log(typeOne);
    return `typeBackground-${typeOne}`;

  }

  function navigateToFusion() {
    navigate('/poke-fusion-dex/fuse?idOne=' + id);
  }

  return (
    <div className='detailsRoot'>
      {/* Nav Bar */}
      <AppNavbar title={pokemon?.name}/>
      
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
              <div className='outlineContainer pokemonNumber px-3 py-0'>#{pokemon?.getGameID() ?? '-'}</div>
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

            {/* Fusion Button */}
            <Col sm={12} className='detailsBodyItem p-4'>
              <button 
                disabled={pokemon?.getGameID() == 'NA'} 
                onClick={navigateToFusion}
                type="button" className="btn btn-warning btn-lg w-100 fuseButton"
              >
                <h3 className='p-0 m-0 font-weight-bold font-italic'>
                  {pokemon?.getGameID() == 'NA' ? 'Not In Game' : 'Fuse Pokemon'}
                </h3>
              </button>
            </Col>

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

import React, {useState} from 'react'
import AppNavbar from "../views/AppNavbar";
import { useSelector } from 'react-redux';
import PokemonSelector from '../views/PokemonFusion/PokemonSelector';
import PokemonFuser from '../views/PokemonFusion/PokemonFuser';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';

import '../styles/PokemonFusion.scss';

export default function PokemonFusionPage() {

  const pokemonIDs = useSelector(state => state.pokemonInfo.map(p => p.getID()));
  const canRandomize = pokemonIDs.length > 400;

  const [fuseState, setFuseState] = useState([null, null]);
  const [fuseID1, fuseID2] = fuseState;

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const pokemon1Param = parseInt(searchParams.get("idOne"));
  const pokemon2Param = parseInt(searchParams.get("idTwo"));
  const autoFuse = searchParams.get("fuse");

  const pokemon1 = pokemon1Param ? parseInt(pokemon1Param) : null;
  const pokemon2 = pokemon2Param ? parseInt(pokemon2Param) : null;

  const canFuse = pokemon1 != null && pokemon2 != null;

  if(autoFuse && canFuse && fuseID1 != pokemon1 && fuseID2 != pokemon2){
    setFusionIDs();
  }

  function setFusionIDs(){
    setFuseState([pokemon1, pokemon2]);
  }

  function setPokemonID(id, index){
    const id1 = index === 1 ? id : pokemon1;
    const id2 = index === 2 ? id : pokemon2;

    const id1Param = id1 ? `idOne=${id1}` : '';
    const id2Param = id2 ? `idTwo=${id2}` : '';
    const andParam = id1 && id2 ? '&' : '';

    const navParam = `/poke-fusion-dex/fuse?${id1Param}${andParam}${id2Param}`;

    console.log(navParam);

    setTimeout(() => {
      navigate(navParam);
    }, 100);
  }

  function randomFusionUrl() {
    const randomID1 = pokemonIDs[Math.floor(Math.random() * pokemonIDs.length)];
    const randomID2 = pokemonIDs[Math.floor(Math.random() * pokemonIDs.length)];
    navigate(`/poke-fusion-dex/fuse?idOne=${randomID1}&idTwo=${randomID2}&fuse=true`);
  }

  return (
    <div className='fusionPageRoot'>
      <AppNavbar active='fuse'/>

      <div className='row fusionPageBody p-0 m-0'>
        <div className='fusionPageCol col col-12 col-md-4'>
          <div className='row'>
            <div className='fusionPageItem col col-12 p-1'>
              <PokemonSelector selected={pokemon1} onSelect={(id) => setPokemonID(id, 1)}/> 
            </div>
            <div className='fusionPageItem col col-12 p-1'>
              <PokemonSelector selected={pokemon2} onSelect={(id) => setPokemonID(id, 2)}/> 
            </div>
          </div>
        </div>
        <div className='fusionPageCol col col-12 col-md-8  p-0'>
          <div className='fusionPageFuse'>
            <div className='row m-0'>
              <div className='fusionPageItem col col-12 p-1'>
                <PokemonFuser fuse1={fuseID1} fuse2={fuseID2}/> 
              </div>
              <div className='fusionPageItem col col-12 p-1'>
                <PokemonFuser fuse1={fuseID2} fuse2={fuseID1}/> 
              </div>
            </div>
            <div className='fuseFloating'>
              <button 
                disabled={!canFuse} 
                onClick={setFusionIDs}
                type="button" className="btn btn-warning btn-lg fuseButton me-3"
              >
                <h3 className='p-0 m-0 font-weight-bold font-italic'>
                  Fuse
                </h3>
              </button>
              <button 
                disabled={!canRandomize} 
                onClick={randomFusionUrl}
                type="button" className="btn btn-primary"
              >
                <FontAwesomeIcon icon={faShuffle} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

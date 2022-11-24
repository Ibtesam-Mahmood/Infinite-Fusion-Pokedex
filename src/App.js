import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import PokemonListPage from './pages/PokemonListPage';
import PokemonStoreAction from './state/InfinitePokedexStore/actions';
import {Router, Routes, Route} from 'react-router-dom';
import RouterWrapper from './services/router/RouterWrapper';

import './styles/App.scss';


export default function App() {

  //Hooks and state

  // Redux state
  const dispatch = useDispatch();
  
  // Get the pokemon when the state reloads
  useEffect(() => {
    dispatch(PokemonStoreAction.thunk.getPokemon());
  }, []);
  
  // Build

  return (
    <>
      <RouterWrapper />
    </>
  )
}

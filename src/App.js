import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import PokemonListPage from './pages/PokemonListPage';
import getPokemonThunkAction from './state/InfinitePokedexStore/thunk/getPokemonThunkAction';
import {Router, Routes, Route} from 'react-router-dom';
import RouterWrapper from './services/router/RouterWrapper';


export default function App() {

  //Hooks and state

  // Redux state
  const dispatch = useDispatch();
  
  // Get the pokemon when the state reloads
  useEffect(() => {
    dispatch(getPokemonThunkAction());
  }, []);
  
  // Build

  return (
    <>
      <RouterWrapper />
    </>
  )
}

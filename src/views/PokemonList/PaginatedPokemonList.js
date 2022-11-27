import React, { useEffect, useState } from 'react'
import PokemonList from './PokemonList';
import {Row, Col, Button, ButtonGroup} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import PokemonStoreAction from '../../state/InfinitePokedexStore/actions';
import PokemonSpinner from '../PokemonSpinner';

const LOADING_STATE = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  ERROR: 'ERROR'
}

export default function PaginatedPokemonList({ pokemon, search = '', pageCount = 150 }) {
  
  // The state for the current page
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(LOADING_STATE.LOADED);

  // Filters the pokemon by the search term
  const filteredPokemon = pokemon.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  const fullPage = pageCount >= filteredPokemon.length; // Hides the buttons
  
  // Redux
  const dispatch = useDispatch();
  const pokemap = useSelector(state => state.pokemap);

  // extrapolated state
  const currentPage = slicePageByIndex(page);

  useEffect(() => {
    loadPage(0);
  }, [search]);

  async function loadPage(pageIndex, delay = 0){
    // Loads all the pokemon in the page
    if(pageLoaded(pageIndex) || loading == LOADING_STATE.LOADING){
      return;
    }
    
    // Set loading
    setLoading(LOADING_STATE.LOADING);
    
    // Wait to see if the user navigates past this page
    setTimeout(() => {
      
      // If the page is still on the same index, load
      // console.log(`RUNNING ${page} ${pageIndex}`);
      // if(page == pageIndex){
      // Dispatch an event to load all the pokemon for that page
      const unloadedPokemon = getPageByIndex(pageIndex);
      // console.log(unloadedPokemon);
      dispatch(PokemonStoreAction.thunk.batchPokemonByID({ids: unloadedPokemon.map(poke => poke.getID()), onComplete: () => {
        setLoading(LOADING_STATE.LOADED);
      }}));
      // }
      
    }, delay);

  }

  function pageLoaded(pageIndex = page){
    const pageList = getPageByIndex(pageIndex);
    return pageList.every(p => pokemap[p.getID()] != null);
  }

  function getPageByIndex(index){
    return index == page ? currentPage : slicePageByIndex(index);
  }

  function slicePageByIndex(index){
    return filteredPokemon.slice(index * pageCount, Math.min((index + 1) * pageCount, filteredPokemon.length));
  }

  function getLastPageCount(){
    return Math.floor(filteredPokemon.length / pageCount);
  }

  function prevPage() {
    if(page != 0){
      const newPage = page - 1;
      setLoading(LOADING_STATE.LOADED);
      setPage(newPage);
      loadPage(newPage);
    }
  }
  
  function nextPage() {
    if(page != getLastPageCount()){
      const newPage = page + 1;
      setLoading(LOADING_STATE.LOADED);
      setPage(newPage);
      loadPage(newPage);
    }
  }

  return (
    <div className='d-flex flex-column'>

    <div style={{minWidth: "100%", minHeight: "200px"}} className='d-flex justify-content-center align-items-center'>
      {(
        pageLoaded() ? <PokemonList pokemon={currentPage} /> : <PokemonSpinner/>
      )}
    </div>
    
    <div className='d-flex justify-content-center my-3'>
      <ButtonGroup>
        {(fullPage ? null : <Button disabled={page == 0} onClick={prevPage}>Back</Button>)}
        <Button disabled={true}>{page * pageCount} - {Math.min((page + 1) * pageCount, filteredPokemon.length)} of {filteredPokemon.length}</Button>
        {(fullPage ? null : <Button disabled={page == getLastPageCount()} onClick={nextPage}>Next</Button>)}
      </ButtonGroup>
    </div>

    </div>
  )
}

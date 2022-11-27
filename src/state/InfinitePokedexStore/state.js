import pokemonInfoReducer from './reducers/pokemonInfoReducer';
import pokemonReducer from './reducers/pokemonReducer';
import pokemonSpeciesReducer from './reducers/pokemonSpeciesReducer';
import evolutionChainReducer from './reducers/evolutionChainReducer';
import { combineReducers } from 'redux';

const state = combineReducers({
    pokemonInfo: pokemonInfoReducer,
    pokemap: pokemonReducer,
    species: pokemonSpeciesReducer,
    chains: evolutionChainReducer
})

export default state;
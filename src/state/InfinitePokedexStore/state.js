import pokemonInfoReducer from './reducers/pokemonInfoReducer';
import pokemonReducer from './reducers/pokemonReducer';
import { combineReducers } from 'redux';

const state = combineReducers({
    pokemonInfo: pokemonInfoReducer,
    pokemap: pokemonReducer
})

export default state;
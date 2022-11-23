import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import loadPokemonThunkAction from '../../state/InfinitePokedexStore/thunk/loadPokemonThunkAction';

export default function PokemonListItem({ pokemonInfo }) {

  const pokemap = useSelector(state => state.pokemap);
  const dispatch = useDispatch();

  const pokemon = pokemap[parseInt(pokemonInfo.getID())];

  useEffect(() => {
    if(pokemon == null){
      // console.log(pokemonInfo.getID());
      dispatch(loadPokemonThunkAction({id: pokemonInfo.getID()}));
    }
  }, []);

  return (
    <div className="grid-item">
      <Link to={`/pokemon/${pokemonInfo.getID()}`}>
        {(pokemon != null && pokemon.sprites != null ? <img src={pokemon.sprites.front_default} /> : null)}
          <p>
              {pokemonInfo.name}
          </p>
      </Link>
    </div>
  )
}

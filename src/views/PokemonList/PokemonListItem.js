import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from "react-bootstrap";
import PokemonTypeImage from "../typeImage/PokemonTypeImage";
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
    <div>
      {/* <Link to={`/pokemon/${pokemonInfo.getID()}`}> */}
        <Card>
          <Card.Img variant='top' src={pokemon != null && pokemon.sprites != null ? pokemon.sprites.front_default : null}></Card.Img>
            <Card.Body>
              <Card.Title>
                <p>No.{pokemonInfo.getID()}</p>
                <h4>{pokemonInfo.name}</h4>
              </Card.Title>
              <Card.Text>
                <PokemonTypeImage pokemon={pokemon}/>
              </Card.Text>

            </Card.Body>
        </Card>
      {/* </Link> */}
    </div>
  )
}

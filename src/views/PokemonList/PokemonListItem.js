import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHover } from 'usehooks-ts';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from "react-bootstrap";
import { capatalize } from '../../services/functions';
import PokemonTypeImage from "../typeImage/PokemonTypeImage";
import loadPokemonThunkAction from '../../state/InfinitePokedexStore/thunk/loadPokemonThunkAction';

import '../../styles/TypeStyles.scss';

export default function PokemonListItem({ pokemonInfo }) {

  const pokemap = useSelector(state => state.pokemap);
  const dispatch = useDispatch();

  const pokemon = pokemap[parseInt(pokemonInfo.getID())];
  
  // Uses a refrence to the card to bind a hover event
  const hoverRef = useRef(null);
  const hovered = useHover(hoverRef);

  useEffect(() => {
    if(pokemon == null){
      // console.log(pokemonInfo.getID());
      dispatch(loadPokemonThunkAction({id: pokemonInfo.getID()}));
    }
  }, []);

  function getClassNameByPokemonType() {
    if(pokemon == null || !hovered){
      return ''
    };

    const typeOne = pokemon.getFirstType();
    console.log(typeOne);
    return `blur typeBackground-${typeOne}`;

  }

  return (
    <div className='pokemonCard'>
      <Link to={`/pokemon/${pokemonInfo.getID()}`} style={{ textDecoration: 'none' }}>
        <Card
          bg='dark'
          text='white'
          // className='pokemonCard'
          ref={hoverRef}
        > 
          <Card.Header className="p-0">
            <Card.Title className="mx-2 my-1 text-center">{capatalize(pokemonInfo.name)}</Card.Title>
          </Card.Header>
          <Card.Img 
            variant='top' 
            className={`${getClassNameByPokemonType()} pokemonImage img-fluid`} 
            src={pokemon != null && pokemon.sprites != null ? pokemon.sprites.front_default : null}
          />
          <Card.Img 
            variant='overlay' 
            style={{objectFit: "cover", display: hovered ? "block" : "none", transition: "visible 1s"}}
            className={`align-self-center w-100 h-100 m-0 p-0`} 
            loading="lazy"
            src={pokemon != null && pokemon.sprites != null ? pokemon.sprites.front_default : null}
          />
          <Card.Body className="p-0">
            <Row className='' style={{margin:"auto"}}>
              <Col className='pokeNumberBox col-auto ps-2 pe-3 my-2'>No.{pokemonInfo.getID()}</Col>
              <Col className='my-auto d-flex p-0 px-2 justify-content-end'><PokemonTypeImage pokemon={pokemon}/></Col>
            </Row>
          </Card.Body>
        </Card>
      </Link>
    </div>
  )
}

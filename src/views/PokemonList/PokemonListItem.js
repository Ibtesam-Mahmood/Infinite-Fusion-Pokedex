import React, { useRef } from 'react';
import {usePokemon} from '../../services/hook';
import { useHover } from 'usehooks-ts';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from "react-bootstrap";
import { capatalize } from '../../services/functions';
import PokemonTypeImage from "../TypeImages/PokemonTypeImage";

import '../../styles/TypeStyles.scss';

export default function PokemonListItem({ pokemonInfo, mini = false, onItemTap }) {

  const id = parseInt(pokemonInfo.getID());
  const pokemon = usePokemon(id);

  const spriteImg = pokemon != null && pokemon.sprites != null ? pokemon.sprites.front_default : '';
  const fullImg = pokemon?.sprites?.other?.['official-artwork']?.front_default ?? pokemon?.sprites?.front_default ?? '';
  
  // Uses a refrence to the card to bind a hover event
  const hoverRef = useRef(null);
  const hovered = useHover(hoverRef);

  function getClassNameByPokemonType() {
    if(pokemon == null){
      return ''
    };

    const typeOne = pokemon.getFirstType();
    // console.log(typeOne);
    return `${hovered ? 'blur' : 'darkenItem'} typeBackground-${typeOne}`;

  }

  const miniClass = mini ? 'mini' : '';

  return (
    <div className={`pokemonCard ${miniClass}`}>
      <Link 
        to={onItemTap != null ? '#' : `/poke-fusion-dex/pokemon/${pokemonInfo.getID()}`} 
        onClick={() => onItemTap(pokemonInfo)} 
        style={{ textDecoration: 'none' }}
      >
        <Card
          bg='dark'
          text='white'
          // className='pokemonCard'
          ref={hoverRef}
        > 
          <Card.Header className="p-0">
            <Card.Title className={`mx-2 my-1 text-center text-truncate ${mini ? 'h6' : ''}`}>{capatalize(pokemonInfo.name)}</Card.Title>
          </Card.Header>
          <div>
            <Card.Img 
              variant='top' 
              className={`${getClassNameByPokemonType()} pokemonImage img-fluid ${miniClass}`} 
              loading="lazy"
              src={spriteImg}
            />
          </div>
          <Card.Img
            variant='overlay' 
            style={{objectFit: "cover", display: hovered ? "block" : "none", transition: "visible 1s"}}
            className={`align-self-center w-100 h-100 m-0 p-0`} 
            height="150"
            width="150"
            loading="lazy"
            src={mini ? spriteImg : fullImg}
          />
          <Card.Body className="p-0">
            <Row className='' style={{margin:"auto"}}>
              {mini ? null : <Col className='pokeNumberBox col-auto ps-2 pe-3 my-2'>No.{pokemonInfo.getGameID()}</Col>}
              <Col className={`${mini ? 'justify-content-center my-1' : 'justify-content-end my-auto'} d-flex p-0 px-2`}>
                <PokemonTypeImage pokemon={pokemon} maxHeight={mini ? '15px' : '20px'}/>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Link>
    </div>
  )
}

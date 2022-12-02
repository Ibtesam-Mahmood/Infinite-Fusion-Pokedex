import React, {useState, useEffect} from 'react'
import PokemonTypeImage from "../TypeImages/PokemonTypeImage";

export default function FusemonImageToken({fusemon}) {

  const id = fusemon?.id;
  const [imgSrc, setImgSrc] = useState(null);

  const typeBackgroundClass = fusemon == null ? '' : `typeBackground-${fusemon.getFirstType()}`;

  useEffect(() => {
    if(fusemon != null){
      if(doesImageExists(fusemon.sprites.front_default)){
        setImgSrc(fusemon.sprites.front_default);
      }
      else{
        setImgSrc(fusemon.sprites.front_fallback);
      }
    }
  }, [id]);

  function doesImageExists(imageUrl){
    var http = new XMLHttpRequest();
    http.open('HEAD', imageUrl, false);
    
    // Can't handle error in an easy way
    http.send();
    return http.status != 404;
  }

  return (
    fusemon == null ? null :
    <div className='pokemonToken container p-0'>
      <div className={`${typeBackgroundClass} pokemonTokenImg m-2`}>
        <img className='img-fluid' src={imgSrc} alt={fusemon?.name}/>
      </div>
      <div className='pokemonName pt-1'>
        <h6 className='text-capitalize container p-0 m-0 pb-2'>{fusemon?.name}</h6>
        <PokemonTypeImage pokemon={fusemon} maxHeight='20px'/>
      </div>
    </div>
  )
}

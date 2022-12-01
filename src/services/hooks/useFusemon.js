import usePokemon from './usePokemon';
import { useEffect, useState } from 'react';
import {Fusemon} from '../../models/pokemon';

const useFusemonHook = (ids) => {

    const [id1, id2] = ids;
    const idsString = `[${ids.join('-')}]`;
    const [pokemon1, pokemon2] = [usePokemon(id1), usePokemon(id2)];

    const [fusemon, setFusemon] = useState(null);
    
    const pokemonLoaded = pokemon1 != null && pokemon2 != null;
    const unMatched = fusemon?.id != idsString;

    // On init state attempt to fetch the pokemon moves
    useEffect(() => {
        // Set the fusemon if the pokemon are loaded and the fusemon is not already set or the ids don't match
        if(unMatched && pokemonLoaded){
            setFusemon(Fusemon.fuse(pokemon1, pokemon2));
        }
    }, [idsString, pokemonLoaded, unMatched]);

    return unMatched ? null : fusemon;
}

export default useFusemonHook;
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PokemonStoreAction from '../../state/InfinitePokedexStore/actions';

const usePokemonSpeciesHook = (id, load = false) => {

    const species = useSelector(state => state.species);
    const dispatch = useDispatch();

    const pokemon = species[parseInt(id)];

    // On init state attempt to fetch the pokemon
    useEffect(() => {
        if(pokemon == null && load){
            dispatch(PokemonStoreAction.thunk.loadSpeciesByID({id: id}));
        }
    }, [id, load]);

    // console.log(pokemon);

    return pokemon;
}

export default usePokemonSpeciesHook;
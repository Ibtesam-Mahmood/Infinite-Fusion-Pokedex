import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PokemonStoreAction from '../../state/InfinitePokedexStore/actions';

const useLoadPokemonHook = (id) => {

    const pokemap = useSelector(state => state.pokemap);
    const dispatch = useDispatch();

    const pokemon = pokemap[parseInt(id)];

    // On init state attempt to fetch the pokemon
    useEffect(() => {
        if(pokemon == null){
            dispatch(PokemonStoreAction.thunk.loadPokemonByID({id: id}));
        }
    }, []);

    // console.log(pokemon);

    return pokemon;
}

export default useLoadPokemonHook;
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PokemonStoreAction from '../../state/InfinitePokedexStore/actions';

const useEvolutionChainHook = (id, load = false) => {

    const chains = useSelector(state => state.chains);
    const dispatch = useDispatch();

    const evolution = chains[parseInt(id)];

    // On init state attempt to fetch the pokemon
    useEffect(() => {
        if(evolution == null && load){
            dispatch(PokemonStoreAction.thunk.loadEvolutionChain({id: id}));
        }
    }, [load, id]);

    // console.log(pokemon);

    return evolution;
}

export default useEvolutionChainHook;
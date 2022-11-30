import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PokemonStoreAction from '../../state/InfinitePokedexStore/actions';

const useMovesHook = (ids, load = false) => {

    const idsString = ids.join(',');

    const moves = useSelector(state => state.moves);
    const dispatch = useDispatch();

    const pokemonMoves = {};
    ids.forEach(id => {
        pokemonMoves[id] = moves[id];
    });

    const loaded = Object.values(pokemonMoves).every(e => e != null);

    // On init state attempt to fetch the pokemon moves
    useEffect(() => {
        if(!loaded && load){
            dispatch(PokemonStoreAction.thunk.batchMoves({ids: ids}));
        }
    }, [load, idsString]);

    return [pokemonMoves, loaded];
}

export default useMovesHook;
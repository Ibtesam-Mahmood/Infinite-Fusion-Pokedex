import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PokemonStoreAction from '../../state/InfinitePokedexStore/actions';

const useAbilitiesHook = (ids, load = false) => {

    const idsString = ids.join(',');

    const abilities = useSelector(state => state.abilities);
    const dispatch = useDispatch();

    const pokemonAbilities = {};
    ids.forEach(id => {
        pokemonAbilities[id] = abilities[id];
    });

    const loaded = Object.values(pokemonAbilities).every(e => e != null);

    // On init state attempt to fetch the pokemon moves
    useEffect(() => {
        if(!loaded && load){
            dispatch(PokemonStoreAction.thunk.batchAbilities({ids: ids}));
        }
    }, [load, idsString]);

    return [pokemonAbilities, loaded];
}

export default useAbilitiesHook;
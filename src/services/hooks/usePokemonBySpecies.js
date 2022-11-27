import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PokemonStoreAction from '../../state/InfinitePokedexStore/actions';

const usePokemonBySpeciesHook = (ids, load = false) => {

    const {pokemap, species} = useSelector(state => state);
    const dispatch = useDispatch();

    const speciesMap = {};
    ids.forEach(id => {
        const spec = species[id];
        const pokemon = spec != null ? pokemap[spec?.getPokemonID()] : null;
        speciesMap[id] = [spec, pokemon];
    });

    const idsString = ids.join(',');
    const loaded = Object.values(speciesMap).every(e => e[0] != null && e[1] != null);

    // On init state attempt to fetch the pokemon
    useEffect(() => {
        // console.log(`RUNNING ${loaded}`);
        // console.log(idsString);
        if(!loaded && load && ids != null && ids.length > 0){
            dispatch(PokemonStoreAction.thunk.batchPokemonBySpeciesID({ids: ids}));
        }
    }, [idsString, load]);

    // console.log(pokemon);

    return speciesMap;
}

export default usePokemonBySpeciesHook;
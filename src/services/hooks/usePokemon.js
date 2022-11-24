import { useSelector } from 'react-redux';

const usePokemonHook = (id) => {

    const pokemap = useSelector(state => state.pokemap);

    const pokemon = pokemap[parseInt(id)];

    // console.log(pokemon);

    return pokemon;
}

export default usePokemonHook;
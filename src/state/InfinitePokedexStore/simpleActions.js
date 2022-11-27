import SetPokemonInfoListAction from './actions/setPokemonInfoListAction';
import SetPokemonAction from './actions/setPokemonAction';
import SetPokemonSpeicesAction from './actions/setPokemonSpeciesAction';
import SetEvolutionChainAction from './actions/setEvolutionChainAction';

const actions = {

    // Actions
    setPokemonInfo: SetPokemonInfoListAction.action,
    setPokemon: SetPokemonAction.action,
    setPokemonSpecies: SetPokemonSpeicesAction.action,
    setEvolution: SetEvolutionChainAction.action,

};

export default actions;
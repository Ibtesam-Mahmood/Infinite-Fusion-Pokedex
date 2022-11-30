import SetPokemonInfoListAction from './actions/setPokemonInfoListAction';
import SetMoveAction from './actions/setMoveAction';
import SetAbilityAction from './actions/setAbilityAction';
import SetPokemonAction from './actions/setPokemonAction';
import SetPokemonSpeicesAction from './actions/setPokemonSpeciesAction';
import SetEvolutionChainAction from './actions/setEvolutionChainAction';

const actions = {

    // Actions
    setPokemonInfo: SetPokemonInfoListAction.action,
    setPokemon: SetPokemonAction.action,
    setPokemonSpecies: SetPokemonSpeicesAction.action,
    setEvolution: SetEvolutionChainAction.action,
    setMove: SetMoveAction.action,
    setAbility: SetAbilityAction.action,
};

export default actions;
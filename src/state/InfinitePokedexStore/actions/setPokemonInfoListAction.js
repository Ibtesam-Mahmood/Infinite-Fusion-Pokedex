const actionName = 'SET_POKEMON_INFO_LIST';

exports.name = actionName;
exports.action = (pokemon = []) => {
    return {
        type: actionName,
        pokemon: pokemon
    }
}
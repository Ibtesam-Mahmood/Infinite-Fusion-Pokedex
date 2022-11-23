const actionName = 'SET_POKEMON';

exports.name = actionName;
exports.action = (pokemon) => {
    return {
        type: actionName,
        id: parseInt(pokemon.id),
        pokemon: pokemon
    }
}
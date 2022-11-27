const actionName = 'SET_POKEMON_SPECIES';

exports.name = actionName;
exports.action = (pokemonSpecies) => {
    return {
        type: actionName,
        id: parseInt(pokemonSpecies.id),
        species: pokemonSpecies
    }
}
const actionName = 'SET_ABILITY';

exports.name = actionName;
exports.action = (ability) => {
    return {
        type: actionName,
        id: parseInt(ability.id),
        ability: ability
    }
}
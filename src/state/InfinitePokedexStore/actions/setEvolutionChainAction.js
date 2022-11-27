const actionName = 'SET_EVOLUTION_CHAIN';

exports.name = actionName;
exports.action = (chain) => {
    return {
        type: actionName,
        id: parseInt(chain.id),
        chain: chain
    }
}
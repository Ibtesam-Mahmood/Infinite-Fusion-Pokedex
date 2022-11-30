const actionName = 'SET_MOVE';

exports.name = actionName;
exports.action = (move) => {
    return {
        type: actionName,
        id: parseInt(move.id),
        move: move
    }
}
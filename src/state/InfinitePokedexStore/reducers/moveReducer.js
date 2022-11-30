import SetMoveAction from '../actions/setMoveAction';

export default function moveReducer(state = {}, action) {
  switch (action.type) {
    case SetMoveAction.name:
      const map = {...state};
      map[action.id] = action.move;
      return map;
    default:
      return state;
  }
}
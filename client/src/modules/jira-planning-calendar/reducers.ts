import { FETCH_DATA, REORDER } from "./action-types";
import { Cell } from "./model/cell/cell";

const initialState = {
  data: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA:
      return {
        data: [...action.data]
      };
    case REORDER:
      const data = [...state.data];
      const cell: Cell = data[action.row][action.col];
      cell.value = action.data;

      return {
        data: data
      };
    default:
      return state;
  }
}

export default rootReducer;

import { FETCH_DATA, REORDER, MOVE } from "./action-types";
import { Cell } from "./model/cell/cell";

const initialState = {
  data: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        data: [...action.data]
      };
    case REORDER:
      const cell: Cell = Object.assign({}, state.data[action.row][action.col]);
      cell.value = action.data;

      const reorderResult: Array<Array<Cell>> = [...state.data];
      reorderResult[action.row][action.col] = cell;

      return {
        data: reorderResult
      };
    case MOVE:
      const sourCell: Cell = Object.assign({}, state.data[action.sourRow][action.sourCol]);
      sourCell.value = action.sourData;
      const destCell: Cell = Object.assign({}, state.data[action.destRow][action.destCol]);
      destCell.value = action.destData;

      const moveResult: Array<Array<Cell>> = [...state.data];
      moveResult[action.sourRow][action.sourCol] = sourCell;
      moveResult[action.destRow][action.destCol] = destCell
      
      return {
        data: moveResult
      };
    default:
      return state;
  }
}

export default rootReducer;

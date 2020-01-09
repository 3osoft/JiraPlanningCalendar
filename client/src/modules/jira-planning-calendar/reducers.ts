import {
  FETCH_DATA,
  REORDER,
  MOVE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE
} from "./action-types";
import { Cell } from "./model/cell/cell";
import { State } from "./state";

const initialState: State = {
  isLoading: true,
  data: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case REORDER:
      const cell: Cell = Object.assign({}, state.data[action.row][action.col]);
      cell.value = action.data;

      const reorderResult: Array<Array<Cell>> = [...state.data];
      reorderResult[action.row][action.col] = cell;

      return {
        data: reorderResult
      };
    case MOVE:
      const sourCell: Cell = Object.assign(
        {},
        state.data[action.sourRow][action.sourCol]
      );
      sourCell.value = action.sourData;
      const destCell: Cell = Object.assign(
        {},
        state.data[action.destRow][action.destCol]
      );
      destCell.value = action.destData;

      const moveResult: Array<Array<Cell>> = [...state.data];
      moveResult[action.sourRow][action.sourCol] = sourCell;
      moveResult[action.destRow][action.destCol] = destCell;

      return {
        data: moveResult
      };
    case FETCH_DATA_REQUEST:
        return {
          isLoading: true,
          data: []
        } as State;
    case FETCH_DATA_SUCCESS:
      return {
        isLoading: false,
        data: [...action.payload]
      } as State;
    case FETCH_DATA_FAILURE:
        return {
          isLoading: false,
          data: [],
          error: Object.assign({}, action.payload)
        } as State;
    default:
      return state;
  }
};

export default rootReducer;

import {
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
  data: [],
  errors: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case REORDER:
      const cell: Cell = Object.assign({}, state.data[action.payload.row][action.payload.col]);
      cell.value = action.payload.data;

      const reorderResult: Array<Array<Cell>> = [...state.data];
      reorderResult[action.payload.row][action.payload.col] = cell;

      return {
        isLoading: false,
        data: reorderResult,
        errors: []
      } as State;
    case MOVE:
      const sourCell: Cell = Object.assign(
        {},
        state.data[action.payload.sourRow][action.payload.sourCol]
      );
      sourCell.value = action.payload.sourData;
      const destCell: Cell = Object.assign(
        {},
        state.data[action.payload.destRow][action.payload.destCol]
      );
      destCell.value = action.payload.destData;

      const moveResult: Array<Array<Cell>> = [...state.data];
      moveResult[action.payload.sourRow][action.payload.sourCol] = sourCell;
      moveResult[action.payload.destRow][action.payload.destCol] = destCell;

      return {
        isLoading: false,
        data: moveResult,
        errors: []
      } as State;
    case FETCH_DATA_REQUEST:
      return {
        isLoading: true,
        data: [], 
        errors: []       
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
        errors: [...action.payload]
      } as State;
    default:
      return state;
  }
};

export default rootReducer;

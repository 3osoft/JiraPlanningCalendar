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

const rootReducer = (state: State = initialState, action) => {
  switch (action.type) {
    case REORDER:
      const reorderResult = [...state.data];

      action.payload.cells.forEach((cell: Cell) => {
        reorderResult[cell.row][cell.col] = Object.assign({}, cell);
      });
      
      return {
        isLoading: false,
        data: reorderResult,
        errors: []
      } as State;
    case MOVE:
      const moveResult: Array<Array<Cell>> = [...state.data];
      const cells: Array<Cell> = action.payload.sourCells.concat(
        action.payload.destCells
      );

      cells.forEach((cell: Cell) => {
        moveResult[cell.row][cell.col] = Object.assign({}, cell);
      });
      return {
        isLoading: false,
        data: moveResult,
        errors: []
      } as State;
    case FETCH_DATA_REQUEST:
      return {
        isLoading: true,
        data: [...state.data],
        errors: []
      } as State;
    case FETCH_DATA_SUCCESS:
      return {
        isLoading: false,
        data: [...action.payload],
        errors: []
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

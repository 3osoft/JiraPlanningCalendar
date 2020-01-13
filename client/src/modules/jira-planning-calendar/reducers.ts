import {
  REORDER,
  MOVE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  SELECT,
  UNSELECT_ALL,
  MULTI_DRAG_SINGLE_DESTINATION
} from "./action-types";
import { Cell } from "./model/cell/cell";
import { State } from "./state";

const initialState: State = {
  isLoading: true,
  data: [],
  multiDragItems: [],
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
        multiDragItems: [],
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
        multiDragItems: [],
        errors: []
      } as State;
    case FETCH_DATA_REQUEST:
      return {
        isLoading: true,
        data: [...state.data],
        multiDragItems: [],
        errors: []       
      } as State;
    case FETCH_DATA_SUCCESS:
      return {
        isLoading: false,
        data: [...action.payload],
        multiDragItems: [],
        errors: []
      } as State;
    case FETCH_DATA_FAILURE:
      return {
        isLoading: false,
        data: [],
        multiDragItems: [],
        errors: [...action.payload]
      } as State;
    case SELECT:      
      return {
        isLoading: false,
        data: [...state.data],
        multiDragItems: [...state.multiDragItems, action.payload.multiDragItem],
        errors: []
      } as State;
      case UNSELECT_ALL:
        return {
          isLoading: false,
          data: [...state.data],
          multiDragItems: [],
          errors: []
        } as State;
      case MULTI_DRAG_SINGLE_DESTINATION:
        const singleDestinationMultiDragResult = [...state.data];
        const sourRow = action.payload.sourRow;
        const sourCol = action.payload.sourCol;
        const destRow = action.payload.destRow;
        const destCol = action.payload.destCol;

        const sourceCell: Cell = Object.assign({}, singleDestinationMultiDragResult[sourRow][sourCol]);
        const destinationCell: Cell = Object.assign({}, singleDestinationMultiDragResult[destRow][destCol]);

        state.multiDragItems.forEach(item => {
          sourceCell.value = sourceCell.value.filter(x => x !== item.value);
          destinationCell.value.push(item.value);
        });

        singleDestinationMultiDragResult[sourRow][sourCol] = sourceCell;
        singleDestinationMultiDragResult[destRow][destCol] = destinationCell;

        return {
          isLoading: false,
          data: singleDestinationMultiDragResult,
          multiDragItems: [],
          errors: []
        } as State;
    default:
      return state;
  }
};

export default rootReducer;

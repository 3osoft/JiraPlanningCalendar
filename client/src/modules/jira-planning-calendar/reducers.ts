import {
  REORDER,
  MOVE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE
} from "./action-types";
import { Cell } from "./model/cell/cell";
import { State } from "./state";
import { CalendarData } from "./model/calendar-data";

const initialState: State = {
  isLoading: true,
  calendarData: {dates: [], issues: [], users: [], sheetData: []} ,
  errors: []
};

const rootReducer = (state: State = initialState, action) => {
  switch (action.type) {
    case REORDER:
      const newCalendarData = {...state.calendarData};
      const reorderResult = [...newCalendarData.sheetData];

      action.payload.cells.forEach((cell: Cell) => {
        reorderResult[cell.row][cell.col] = Object.assign({}, cell);
      });

      newCalendarData.sheetData = reorderResult;
      
      return {
        isLoading: false,
        calendarData: newCalendarData,
        errors: []
      } as State;
    case MOVE:
      const newData: CalendarData = {...state.calendarData};
      const moveResult: Array<Array<Cell>> = [...newData.sheetData];
      const cells: Array<Cell> = action.payload.sourCells.concat(
        action.payload.destCells
      );

      cells.forEach((cell: Cell) => {
        moveResult[cell.row][cell.col] = Object.assign({}, cell);
      });
      newData.sheetData = moveResult;
      return {
        isLoading: false,
        calendarData: newData,
        errors: []
      } as State;
    case FETCH_DATA_REQUEST:
      return {
        isLoading: true,
        calendarData: {...state.calendarData},
        errors: []
      } as State;
    case FETCH_DATA_SUCCESS:
      return {
        isLoading: false,
        calendarData: {...action.payload},
        errors: []
      } as State;
    case FETCH_DATA_FAILURE:
      return {
        isLoading: false,
        calendarData: {},
        errors: [...action.payload]
      } as State;
    default:
      return state;
  }
};

export default rootReducer;

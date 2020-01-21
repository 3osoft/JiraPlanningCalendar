import {
  REORDER,
  MOVE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  NEW_CALENDAR_DATA
} from "./action-types";
import { Cell } from "./model/cell/cell";
import { State } from "./state";

const initialState: State = {
  isLoading: true,
  calendarData: {
    dates: [],
    issues: [],
    users: [],
    sheetData: [],
    colorMap: new Map<string, string | undefined>()
  },
  errors: []
};

const reducer = (state: State = initialState, action) => {
  switch (action.type) {
    case REORDER:
      action.payload.cells.forEach((cell: Cell) => {
        state.calendarData.sheetData[cell.row][cell.col] = cell;
      });
      state.isLoading = false;
      state.errors = [];
      return state;
    case MOVE:
      const cells: Array<Cell> = action.payload.sourCells.concat(
        action.payload.destCells
      );
      cells.forEach((cell: Cell) => {
        state.calendarData.sheetData[cell.row][cell.col] = cell;
      });

      state.isLoading = false;
      state.errors = [];
      return state;
    case FETCH_DATA_REQUEST:
      state.isLoading = true;
      state.isLoading = state.isLoading;
      state.errors = [];
      return state;
    case FETCH_DATA_SUCCESS:
      state.isLoading = false;
      state.calendarData = action.payload;
      state.errors = [];
      return state;
    case FETCH_DATA_FAILURE:
      state = initialState;
      state.errors = action.payload;
      return state;
    case NEW_CALENDAR_DATA:
      const data = state.calendarData;
      data.issues = action.payload.issues;
      data.sheetData = action.payload.sheetData;
      data.sheetData.forEach((_, index) => {
        data.sheetData[index] = action.payload.sheetData[index];
      })
      
      for(let i = 0; i < data.sheetData.length; i++) {
        for(let j = 0; j< data.sheetData[i].length; j++) {
          data.sheetData[i][j] = {...data.sheetData[i][j]};
        }
      }

      state.calendarData = data;
      state.isLoading = false;
      state.errors = [];
      return state;
    default:
      return state;
  }
};

export default reducer;

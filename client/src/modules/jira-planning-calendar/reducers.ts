import {
  LOADING_STARTED,
  LOADING_FINISHED,
  SUCCESS_WITH_RESULT,
  ERROR,
  DRAG_AND_DROP,
} from "./action-types";
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
    case LOADING_STARTED:
      state.isLoading = true;
      return state;
    case LOADING_FINISHED:
      state.isLoading = false;
      return state;
    case SUCCESS_WITH_RESULT:
      state.isLoading = false;
      state.calendarData = action.payload;
      return state;
    case ERROR:
      state.errors = action.payload;
      return state;
    case DRAG_AND_DROP:
      const data = state.calendarData;
      data.issues = action.payload.issues;
      data.sheetData = action.payload.sheetData;
      data.sheetData.forEach((_, index) => {
        data.sheetData[index] = action.payload.sheetData[index];
      });
      
      action.payload.changedPositions.forEach(position => {
        data.sheetData[position.row][position.col] = {...data.sheetData[position.row][position.col]};
      });

      state.calendarData = data;
      return state;
    default:
      return state;
  }
};

export default reducer;

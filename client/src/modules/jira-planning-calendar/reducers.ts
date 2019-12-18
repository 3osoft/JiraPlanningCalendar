import { FETCH_DATA, FILTER_DATA } from "./action-types";

const initialState = {
  data: []
};

function sheetReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA:
      var result = {
        data: [...action.data]
      };
      return result;
    case FILTER_DATA:
      var result = {
        data: [...action.data]
      };
      return result;
    default:
      return state;
  }
}

export default sheetReducer;

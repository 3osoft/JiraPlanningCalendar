import { FETCH_DATA, REORDER } from "./action-types";

export function fetchDataAction(data) {
  return {
    type: FETCH_DATA,
    data
  };
}

export function reorderAction(row, col, data) {
  return {
    type: REORDER,
    row,
    col,
    data
  };
}

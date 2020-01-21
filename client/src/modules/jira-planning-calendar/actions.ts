import {
  REORDER,
  MOVE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  NEW_CALENDAR_DATA
} from "./action-types";

import { Position } from "../shared/position";

import { Cell } from "./model/cell/cell";
import { Issue } from "./domain/issue/issue";

export const fetchDataRequested = () => {
  return {
    type: FETCH_DATA_REQUEST
  };
};

export const fetchDataSuccess = result => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: result
  };
};

export const fetchDataFailure = error => {
  return {
    type: FETCH_DATA_FAILURE,
    payload: error
  };
};

export const reorder = (pos: Position, cells: Array<Cell>) => {
  return {
    type: REORDER,
    payload: {
      pos,
      cells
    }
  };
};

export const move = (sourCells: Array<Cell>, destCells: Array<Cell>) => {
  return {
    type: MOVE,
    payload: {
      sourCells,
      destCells
    }
  };
};

export const newCalendarData = (issues: Array<Issue>, sheetData: Array<Array<Cell>>, changedPositions: Array<Position>) => {
  return {
    type: NEW_CALENDAR_DATA,
    payload: {
      issues,
      sheetData,
      changedPositions
    }
  };
};

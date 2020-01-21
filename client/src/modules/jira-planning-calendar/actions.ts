import {
  REORDER,
  MOVE,
  LOADING_STARTED,
  SUCCESS_WITH_RESULT,
  NEW_CALENDAR_DATA,
  ERROR,
  LOADING_FINISHED
} from "./action-types";

import { Position } from "../shared/position";

import { Cell } from "./model/cell/cell";
import { Issue } from "./domain/issue/issue";

export const loadingStarted = () => {
  return {
    type: LOADING_STARTED
  };
};

export const loadingFinished = () => {
  return {
    type: LOADING_FINISHED
  };
};

export const successWithResult = result => {
  return {
    type: SUCCESS_WITH_RESULT,
    payload: result
  };
};

export const errorResult = error => {
  return {
    type: ERROR,
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

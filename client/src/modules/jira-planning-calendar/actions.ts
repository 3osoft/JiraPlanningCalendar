import {
  LOADING_STARTED,
  SUCCESS_WITH_RESULT,
  DRAG_AND_DROP,
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

export const dragAndDrop = (issues: Array<Issue>, sheetData: Array<Array<Cell>>, changedPositions: Array<Position>) => {
  return {
    type: DRAG_AND_DROP,
    payload: {
      issues,
      sheetData,
      changedPositions
    }
  };
};

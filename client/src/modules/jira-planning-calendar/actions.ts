import {
  REORDER,
  MOVE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE
} from "./action-types";

import { Position } from "../shared/position";

import { Cell } from "./model/cell/cell";

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

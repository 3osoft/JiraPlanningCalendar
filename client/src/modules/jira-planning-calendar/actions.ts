import { FETCH_DATA, REORDER, MOVE } from "./action-types";
import { Cell } from "./model/cell/cell";

export const fetchDataAction = (data: Array<Array<Cell>>) => {
  return {
    type: FETCH_DATA,
    data
  };
};

export const reorderAction = (row: number, col: number, data: Array<any>) => {
  return {
    type: REORDER,
    row,
    col,
    data
  };
};

export const moveAction = (
  sourRow: number,
  sourCol: number,
  sourData: Array<any>,
  destRow: number,
  destCol: number,
  destData: Array<any>
) => {
  return {
    type: MOVE,
    sourRow,
    sourCol,
    sourData,
    destRow,
    destCol,
    destData
  };
};

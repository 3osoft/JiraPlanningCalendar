import {
  REORDER,
  MOVE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE
} from "./action-types";
import { DataService, Query } from "./data-service";
import { Position } from "../shared/position";
import { IssuePart } from "./domain/issue/issue-part";
import { Cell } from "./model/cell/cell";
import { State } from "./state";

export const fetchDataAction = (query?: Query) => {
  return async dispatch => {
    dispatch(fetchDataRequested());

    try {
      const dataService = new DataService();
      const result = await dataService.loadData(query);
      dispatch(fetchDataSuccess(result));
    } catch (error) {
      console.log(error);
      dispatch(fetchDataFailure([error]));
    }
  };
};

const fetchDataRequested = () => {
  return {
    type: FETCH_DATA_REQUEST
  };
};

const fetchDataSuccess = result => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: result
  };
};

const fetchDataFailure = error => {
  return {
    type: FETCH_DATA_FAILURE,
    payload: error
  };
};

export const reorderAction = (
  pos: Position,
  sourIndex: number,
  destIndex: number
) => {
  return (dispatch, getState) => {
    const state: State = getState();

    const data = [...state.data];
    const issuePart: IssuePart = data[pos.row][pos.col].value[sourIndex];

    const startIndex = pos.col - issuePart.actualPart;
    const endIndex = startIndex + issuePart.totalParts;

    const cells: Array<Cell> = data[pos.row].slice(startIndex, endIndex);
    cells.forEach((cell: Cell) => {
      const [removed] = cell.value.splice(sourIndex, 1);
      cell.value.splice(destIndex, 0, removed);
    });

    dispatch(reorder(pos, cells));
  };
};

const reorder = (pos: Position, cells: Array<Cell>) => {
  return {
    type: REORDER,
    payload: {
      pos,
      cells
    }
  };
};

export const moveAction = (
  draggable: IssuePart,
  sourPos: Position,
  destPos: Position
) => {
  return (dispatch, getState) => {
    const state: State = getState();
    const moveResult = [...state.data];

    const startIndex = sourPos.col;
    const endIndex = startIndex + draggable.totalParts - draggable.actualPart;

    const parts = moveResult[sourPos.row]
      .slice(startIndex, endIndex)
      .map((cell: Cell) => {
        return cell.value.find(
          (issuePart: IssuePart) => issuePart.issue.key === draggable.issue.key
        );
      });

    const sourCells: Array<Cell> = moveResult[sourPos.row].slice(
      sourPos.col,
      sourPos.col + parts.length
    );
    sourCells.forEach((cell: Cell, index) => {
      const newCell: Cell = Object.assign({}, cell);
      newCell.value = cell.value.filter(
        (issuePart: IssuePart) => issuePart.issue.key !== draggable.issue.key
      );
      sourCells[index] = newCell;
    });

    const destCells: Array<Cell> = moveResult[destPos.row].slice(
      destPos.col,
      destPos.col + parts.length
    );
    destCells.forEach((cell: Cell) => {
      const newCell: Cell = Object.assign({}, cell);
      const item = parts.splice(0, 1)[0];
      newCell.value.push(item);
      newCell.value = newCell.value.sort((item1: IssuePart, item2: IssuePart) => {
        let result: number;
        if (item1.issue.key > item2.issue.key) {
          return 1;
        }

        return item1.totalParts < item2.totalParts ? 1 : -1;
      });
    });

    dispatch(move(sourCells, destCells))
  };
};

const move = (sourCells: Array<Cell>, destCells: Array<Cell>) => {
  return {
    type: MOVE,
    payload: {
      sourCells,
      destCells
    }
  };
};

import {
  REORDER,
  MOVE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  SELECT,
  UNSELECT_ALL,
  MULTI_DRAG_SINGLE_DESTINATION
} from "./action-types";
import { DataService, Query } from "./data-service";
import { Cell } from "./model/cell/cell";
import { MultiDragItem } from "./model/cell/multi-drag-item";

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

export const reorderAction = (row: number, col: number, data: Array<any>) => {
  return {
    type: REORDER,
    payload: {
      row,
      col,
      data
    }
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
    payload: {
      sourRow,
      sourCol,
      sourData,
      destRow,
      destCol,
      destData
    }
  };
};

export const selectAction = (multiDragItem: MultiDragItem) => {
  return {
    type: SELECT,
    payload: {
      multiDragItem
    }
  };
};

export const unselectAllAction = () => {
  return {
    type: UNSELECT_ALL
  };
};

export const singleDestinationMultiDragAndDropAction = (
  sourRow: number,
  sourCol: number,
  destRow: number,
  destCol: number
) => {
  return {
    type: MULTI_DRAG_SINGLE_DESTINATION,
    payload: {
      sourRow,
      sourCol,
      destRow,
      destCol
    }
  };
};

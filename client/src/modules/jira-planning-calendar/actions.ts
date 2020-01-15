import {
  REORDER,
  MOVE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE
} from "./action-types";
import { DataService, Query } from "./data-service";
import { reorder, move } from "../shared/drag-and-drop-utils";
import { Position } from '../shared/position';

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

export const reorderAction = (
  pos: Position,
  sourIndex: number,
  destIndex: number,
  list: Array<any>
) => {
  const data = reorder(list, sourIndex, destIndex);
  return {
    type: REORDER,
    payload: {
      pos,
      data
    }
  };
};

export const moveAction = (
  sourPos: Position,
  destPos: Position,
  sourceList: Array<any>,
  destinationList: Array<any>,
  source,
  destination
) => {
  const result = move(sourceList, destinationList, source, destination);
  const sourData = result[source.droppableId];
  const destData = result[destination.droppableId];
  return {
    type: MOVE,
    payload: {
      sourPos,
      sourData,
      destPos,
      destData
    }
  };
};

import { DataService, Query } from "./data-service";
import { IssuePart } from "./domain/issue/issue-part";
import { State } from "./state";
import { sortByLengthAndKey } from "./domain/issue/issue-sort";
import { fetchDataRequested, fetchDataSuccess, fetchDataFailure, reorder, move } from "./actions";
import { Cell } from "./model/cell/cell";
import { Position } from '../shared/position';
import moment from "moment";

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

 export const reorderAction = (
   pos: Position,
   sourIndex: number,
   destIndex: number
 ) => {
   return (dispatch, getState) => {
     const state: State = getState();
 
     const data = [...state.calendarData.sheetData];
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

 export const moveAction = (
   draggedIssuePart: IssuePart,
   sourPos: Position,
   destPos: Position
 ) => {
   return (dispatch, getState) => {
     const state: State = getState();
     const moveResult = [...state.calendarData.sheetData];
     const issue = draggedIssuePart.issue;

     if (sourPos.row !== destPos.row) {
       // change assignee
       const newUser = state.calendarData.sheetData[destPos.row][destPos.col].user!;
      //  issue.assignee = newUser;
     }
     if (sourPos.col !== destPos.col) {
       const dateChange = destPos.col - sourPos.col;
      //  issue.startDate = moment(issue.startDate).add(dateChange, "d").toDate();
     }
 
     const startIndex = sourPos.col;
     const endIndex =
       startIndex + draggedIssuePart.totalParts - draggedIssuePart.actualPart;
 
     const parts = moveResult[sourPos.row]
       .slice(startIndex, endIndex)
       .map((cell: Cell) => {
         return cell.value.find(
           (issuePart: IssuePart) =>
             issuePart.issue.key === draggedIssuePart.issue.key
         );
       });
 
     const sourCells: Array<Cell> = moveResult[sourPos.row].slice(
       sourPos.col,
       sourPos.col + parts.length
     );
     sourCells.forEach((cell: Cell, index) => {
       const newCell: Cell = Object.assign({}, cell);
       newCell.value = cell.value.filter(
         (issuePart: IssuePart) =>
           issuePart.issue.key !== draggedIssuePart.issue.key
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
       newCell.value = newCell.value.sort(sortByLengthAndKey);
       
     });
 
     dispatch(move(sourCells, destCells));
   };
 };
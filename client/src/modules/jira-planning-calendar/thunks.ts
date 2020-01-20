import { DataService, Query } from "./data-service";
import { IssuePart } from "./domain/issue/issue-part";
import { State } from "./state";
import { fetchDataRequested, fetchDataSuccess, fetchDataFailure, reorder, move, newCalendarData } from "./actions";
import { Cell } from "./model/cell/cell";
import { Position } from '../shared/position';
import moment from "moment";
import { CalendarDataCalculator } from "./calendar-data-calculator";

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
     const issue = draggedIssuePart.issue;

     if (sourPos.row !== destPos.row) {
       // change assignee
       const newUser = state.calendarData.sheetData[destPos.row][destPos.col].user!;
       issue.assignee = newUser;
     }
     if (sourPos.col !== destPos.col) {
       const dateChange = destPos.col - sourPos.col;
       issue.startDate = moment(issue.startDate).add(dateChange, "d").toDate();
     }
     const changedIssues = [issue];

     const newData = CalendarDataCalculator.recalculateChangedIssues(state.calendarData, changedIssues);
 
     dispatch(newCalendarData(changedIssues, newData[0].sheetData, newData[1]));
   };
 };
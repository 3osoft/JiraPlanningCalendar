import { DataService, Query, UpdateIssueData } from "./data-service";
import { IssuePart } from "./domain/issue/issue-part";
import {
  fetchDataRequested,
  fetchDataSuccess,
  fetchDataFailure,
  reorder,
  move,
  newCalendarData
} from "./actions";
import { Cell } from "./model/cell/cell";
import { Position } from "../shared/position";
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
    const state = getState();

    const data = state.reducer.calendarData.sheetData;
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
  return async (dispatch, getState) => {
    const state = getState();
    const issue = draggedIssuePart.issue;
    const updateIssueData = { issueKey: issue.key } as UpdateIssueData;

    if (sourPos.row !== destPos.row) {
      // change assignee
      const newUser = state.reducer.calendarData.sheetData[destPos.row][
        destPos.col
      ].user!;
      issue.assignee = newUser;
      updateIssueData.newAssignee = issue.assignee;
    }
    if (sourPos.col !== destPos.col) {
      const dateChange = destPos.col - sourPos.col;
      issue.startDate = moment(issue.startDate)
        .add(dateChange, "d")
        .toDate();
      updateIssueData.newStartDate = issue.startDate;
    }

    const changedIssues = [issue];
    const dataService = new DataService();
    try {
      await dataService.updateIssues([updateIssueData]);

      const newData = CalendarDataCalculator.recalculateChangedIssues(
        state.reducer.calendarData,
        changedIssues
      );

      dispatch(
        newCalendarData(changedIssues, newData[0].sheetData, newData[1])
      );
    } catch (error) {
      console.log(error);
      dispatch(fetchDataFailure([error]));
    }
  };
};

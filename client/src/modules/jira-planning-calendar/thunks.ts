import { DataService, Query, UpdateIssueData } from "./data-service";
import { IssuePart } from "./domain/issue/issue-part";
import {
  loadingStarted,
  successWithResult,
  errorResult,
  dragAndDrop,
  loadingFinished
} from "./actions";
import { Position } from "../shared/position";
import moment from "moment";
import { CalendarDataCalculator } from "./calendar-data-calculator";

export const fetchDataAction = (query?: Query) => {
  return async dispatch => {
    dispatch(loadingStarted());

    try {
      const dataService = new DataService();
      const result = await dataService.loadData(query);
      dispatch(successWithResult(result));
    } catch (error) {
      console.log(error);
      dispatch(errorResult([error]));
    }
  };
};

export const dragAndDropAction = (
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
    const newData = CalendarDataCalculator.recalculateChangedIssues(
      state.reducer.calendarData,
      changedIssues
    );

    dispatch(dragAndDrop(changedIssues, newData[0].sheetData, newData[1]));

    dispatch(loadingStarted());
    
    const dataService = new DataService();
    try {
      await dataService.updateIssues([updateIssueData]);

      dispatch(loadingFinished());
    } catch (error) {
      console.log(error);
      dispatch(errorResult([error]));
    }
  };
};

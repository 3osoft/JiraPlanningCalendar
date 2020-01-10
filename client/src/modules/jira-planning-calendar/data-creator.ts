import { Cell } from "./model/cell/cell";
import { Issue } from "./domain/issue/issue";
import { User } from "./domain/user/user";
import ListDataViewer from "./components/ListDataViewer";
import ReadOnlyDataViewer from "./components/ReadOnlyDataViewer";
import { getNumberOfDays, getDateRange } from "../shared/date-helper";
import { v4 as uuid } from 'uuid';

export class CalendarDataCreator {
  private data = new Array<Array<Cell>>();
  private users = new Array<Cell>();
  private issues = new Array<Cell>();
  private dates = new Array<Cell>();
  private startDate: Date;
  private endDate: Date;

  get calendarData() {
    return this.data;
  }

  constructor(
    users: Array<User>,
    issues: Array<Issue>,
    startDate: Date,
    endDate: Date
  ) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.addDates();
    this.addUsers(users);
    this.addIssues(issues);
    this.create();
  }

  private addDates(): void {
    const dates = getDateRange(
      new Date(this.startDate),
      new Date(this.endDate)
    );

    for (let index = 0; index < dates.length; index++) {
      const cell = this.createCell(
        index + 1,
        0,
        dates[index],
        ReadOnlyDataViewer
      );
      this.dates.push(cell);
    }
  }

  private addUsers(users: Array<User>): void {
    for (let index = 0; index < users.length; index++) {
      const cell = this.createCell(0, index + 1, users[index].displayName);
      this.users.push(cell);
    }
  }

  private addIssues(issues: Array<Issue>): void {
    const issuesMap = new Map<string, Array<string>>();

    for (let index = 0; index < issues.length; index++) {
      const issue = issues[index];

      const startDateIndex = this.dates.findIndex(
        x => x.value === issue.startDate.toLocaleDateString()
      );

      const dueDateIndex = this.dates.findIndex(
        x => x.value === issue.dueDate.toLocaleDateString()
      );

      const dateCells = this.dates.slice(startDateIndex, dueDateIndex);

      const userCell = this.users.find(
        x => x.value === issue.assignee.displayName
      );

      if (!userCell) {
        throw new Error(
          "No users were found. Without users, issues cannot be displayed"
        );
      }

      dateCells.forEach(dateCell => {
        let col = dateCell.col;
        const row = userCell.row;

        let data = issuesMap.get(JSON.stringify({ row, col }));

        if (!data) {
          data = [];
        }

        data.push(issue.key);
        issuesMap.set(JSON.stringify({ row, col }), data);
        this.issues.push(this.createCell(col, row, data, ListDataViewer));
      });
    }
  }

  private create(): void {
    const rowCount = this.users.length + 1;
    const columnCount = getNumberOfDays(this.startDate, this.endDate) + 1;

    for (let i = 0; i < rowCount; i++) {
      this.data[i] = [];
      for (let j = 0; j < columnCount; j++) {
        const emptyCell = this.createCell(j, i, [], ListDataViewer);
        this.addCell(emptyCell);
      }
    }

    // dates
    this.dates.forEach(x => {
      this.addCell(x);
    });

    // users
    this.users.forEach(x => {
      this.addCell(x);
    });

    // issues
    this.issues.forEach(x => {
      this.addCell(x);
    });
  }

  private createCell(
    col: number,
    row: number,
    value: any,
    dataViewer?: any
  ): Cell {
    return {
      id: uuid(),
      col: col,
      row: row,
      value: value,
      DataViewer: dataViewer
    };
  }

  private addCell(cell: Cell): void {
    this.data[cell.row][cell.col] = cell;
  }
}

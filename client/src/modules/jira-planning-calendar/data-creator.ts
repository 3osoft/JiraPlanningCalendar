import { Cell } from "./model/cell/cell";
import { Issue } from "./domain/issue/issue";
import { User } from "./domain/user/user";
import ListDataViewer from "./components/ListDataViewer";
import {
  getNumberOfDays,
  getDateRange,
  isToday,
  isFuture
} from "../shared/date-helper";
import { IssuePart } from "./domain/issue/issue-part";
import { CellType } from "./model/cell/cell-type";

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
      const cell = this.createCell(0, index + 1, dates[index], CellType.READONLY);
      this.dates.push(cell);
    }
  }

  private addUsers(users: Array<User>): void {
    for (let index = 0; index < users.length; index++) {
      const cell = this.createCell(
        index + 1,
        0,
        users[index].displayName,
        CellType.READONLY
      );
      this.users.push(cell);
    }
  }

  private addIssues(issues: Array<Issue>): void {
    const issuesMap = new Map<string, Array<IssuePart>>();

    for (let index = 0; index < issues.length; index++) {
      const issue = issues[index];

      const issueParts = getDateRange(issue.startDate, issue.dueDate).map(
        (date, index, all) => {
          return new IssuePart(issue, index, all.length);
        }
      );

      const startDateIndex = this.dates.findIndex(
        x => x.value === issue.startDate.toLocaleDateString()
      );

      let dueDateIndex = this.dates.findIndex(
        x => x.value === issue.dueDate.toLocaleDateString()
      );

      if (dueDateIndex !== -1) {
        dueDateIndex = dueDateIndex + 1;
      }

      const dateCells = this.dates.slice(startDateIndex, dueDateIndex);

      const userCell = this.users.find(
        x => x.value === issue.assignee.displayName
      );

      if (!userCell) {
        throw new Error(
          "No users were found. Without users, issues cannot be displayed"
        );
      }

      dateCells.forEach((dateCell, idx) => {
        let col = dateCell.col;
        const row = userCell.row;

        let data = issuesMap.get(JSON.stringify({ row, col }));

        if (!data) {
          data = [];
        }

        data.push(issueParts[idx]);
        issuesMap.set(JSON.stringify({ row, col }), data);

        let cellType: CellType;

        const date = dateCell.value;

        if (isToday(date)) {
          cellType = CellType.DRAG_AND_DROP;
        } else if (isFuture(date)) {
          cellType = CellType.DRAGGABLE;
        } else {
          cellType = CellType.READONLY;
        }

        this.issues.push(
          this.createCell(row, col, data, cellType, ListDataViewer)
        );
      });
    }
  }

  private create(): void {
    const rowCount = this.users.length + 1;
    const columnCount = getNumberOfDays(this.startDate, this.endDate) + 1;

    for (let i = 0; i < rowCount; i++) {
      this.data[i] = [];
      for (let j = 0; j < columnCount; j++) {
        const emptyCell = this.createCell(
          i,
          j,
          [],
          CellType.READONLY
        );
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
    row: number,
    col: number,
    value: any,
    cellType: CellType,
    dataViewer?: any,
  ): Cell {
    return {
      row: row,
      col: col,
      value: value,
      DataViewer: dataViewer,
      cellType: cellType
    };
  }

  private addCell(cell: Cell): void {
    this.data[cell.row][cell.col] = cell;
  }
}

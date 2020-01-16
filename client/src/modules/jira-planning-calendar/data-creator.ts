import { Cell } from "./model/cell/cell";
import { Issue } from "./domain/issue/issue";
import { User } from "./domain/user/user";
import ListDataViewer from "./components/ListDataViewer";
import {
  getNumberOfDays,
  getDateRange,
  isToday,
  isFuture,
  isSame
} from "../shared/date-helper";
import { IssuePart } from "./domain/issue/issue-part";
import { CellType } from "./model/cell/cell-type";
import { sortByLengthAndKey } from "./domain/issue/issue-sort";
var randomColor = require("randomcolor");

export class CalendarDataCreator {
  private data = new Array<Array<Cell>>();
  private users = new Array<User>();
  private issues = new Array<Issue>();
  private dates = new Array<Date>();
  private startDate: Date;
  private endDate: Date;
  private currentDateCol: number;

  constructor(
    users: Array<User>,
    issues: Array<Issue>,
    startDate: Date,
    endDate: Date
  ) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.currentDateCol = getNumberOfDays(startDate, new Date());
    this.dates = getDateRange(this.startDate, this.endDate);
    this.users = users;
    this.issues = issues;

    const rowCount = this.users.length + 1;
    const colCount = getNumberOfDays(this.startDate, this.endDate) + 1;
    this.init(rowCount, colCount);
  }

  createData(): Array<Array<Cell>> {
    this.addDates();
    this.addUsers();
    this.addIssues();
    return this.data;
  }

  private addDates(): void {
    this.dates.forEach((date: Date, index: number) => {
      const cell = this.createCell(
        0,
        index + 1,
        date.toLocaleDateString(),
        CellType.READONLY
      );
      this.addCell(cell);
    });
  }

  private addUsers(): void {
    this.users.forEach((user: User, index: number) => {
      const cell = this.createCell(
        index + 1,
        0,
        user.displayName,
        CellType.READONLY
      );
      this.addCell(cell);
    });
  }

  private addIssues(): void {
    const issuesMap = new Map<string, Array<IssuePart>>();
    const colorMap = new Map<string, string | undefined>();

    this.issues.forEach((issue: Issue, index: number) => {
      const startDate = issue.startDate ? issue.startDate : issue.created;
      const endDate = issue.dueDate ? issue.dueDate : this.endDate;

      const issueParts = getDateRange(startDate, endDate).map(
        (date, index, all) => {
          let color = colorMap.get(issue.key);

          if (!color) {
            color = randomColor({
              luminosity: "light",
              format: "rgba",
              alpha: 0.8
            });
            colorMap.set(issue.key, color);
          }
          return new IssuePart(issue, index, all.length, color);
        }
      );

      const startDateIndex = this.dates.findIndex(date =>
        isSame(date, startDate)
      );

      let dueDateIndex = this.dates.findIndex(date => isSame(date, endDate));

      if (dueDateIndex !== -1) {
        dueDateIndex = dueDateIndex + 1;
      }

      const dateCells = this.dates.slice(startDateIndex, dueDateIndex);
      const userIndex = this.users.findIndex(
        (user: User) => user.accountId === issue.assignee.accountId
      );

      if (userIndex === -1) {
        throw new Error(
          "No users were found. Without users, issues cannot be displayed"
        );
      }

      const row = userIndex + 1;
      dateCells.forEach((dateCell, idx) => {
        const col = startDateIndex + idx + 1;

        let data = issuesMap.get(JSON.stringify({ row, col }));

        if (!data) {
          data = [];
        }

        data.push(issueParts[idx]);
        issuesMap.set(JSON.stringify({ row, col }), data);

        const cell: Cell = this.createCell(
          row,
          col,
          data.sort(sortByLengthAndKey),
          CellType.DRAG_AND_DROP,
          ListDataViewer
        );
        this.addCell(cell);
      });
    });
  }

  private init(rowCount: number, columnCount: number): void {
    for (let i = 0; i < rowCount; i++) {
      this.data[i] = [];
      for (let j = 0; j < columnCount; j++) {
        const cellType: CellType = this.getCellType(j);

        const emptyCell = this.createCell(i, j, [], cellType, ListDataViewer);
        this.addCell(emptyCell);
      }
    }
  }

  private getCellType(currentCol: number): CellType {
    let cellType: CellType;
    if (this.currentDateCol === currentCol) {
      cellType = CellType.DRAG_AND_DROP;
    } else if (this.currentDateCol < currentCol) {
      cellType = CellType.DRAGGABLE;
    } else {
      cellType = CellType.READONLY;
    }
    return cellType;
  }

  private createCell(
    row: number,
    col: number,
    value: any,
    cellType: CellType,
    dataViewer?: any
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

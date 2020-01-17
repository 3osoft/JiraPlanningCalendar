import { Cell } from "./model/cell/cell";
import { Issue } from "./domain/issue/issue";
import { User } from "./domain/user/user";
import ListDataViewer from "./components/ListDataViewer";
import {
  getNumberOfDays,
  getDateRange,
  isSame
} from "../shared/date-helper";
import { IssuePart } from "./domain/issue/issue-part";
import { CellType } from "./model/cell/cell-type";
import DateViewer from './components/DateViewer';
import { CalendarData } from "./model/calendar-data";
var randomColor = require("randomcolor");

export class CalendarDataCreator {
  private data = new Array<Array<Cell>>();
  private users = new Array<User>();
  private issues = new Array<Issue>();
  private dates = new Array<Date>();
  private startDate: Date;
  private endDate: Date;
  private currentDateCol: number;
  private colorMap = new Map<string, string | undefined>();

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

  createData(): CalendarData {
    this.addDates();
    this.addUsers();
    this.addIssues();
    return { 
      dates: this.dates,
      issues: this.issues,
      users: this.users,
      sheetData: this.data,
      colorMap: this.colorMap
    } as CalendarData;
  }

  private addDates(): void {
    this.dates.forEach((date: Date, index: number) => {
      const cell = this.createCell(
        0,
        index + 1,
        date,
        CellType.READONLY,
        true,
        DateViewer,
        undefined,
        date
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
        CellType.READONLY,
        true,
        undefined,
        user
      );
      this.addCell(cell);
    });
  }

  private addIssues(): void {
    const issuesMap = new Map<string, Array<IssuePart>>();

    this.issues.forEach((issue: Issue, index: number) => {
      const startDate = issue.startDate ? issue.startDate : issue.created;
      const endDate = issue.dueDate ? issue.dueDate : this.endDate;

      const issueParts: Array<IssuePart> = getDateRange(startDate, endDate).map(
        (date, index, all) => {
          let color = this.colorMap.get(issue.key);

          if (!color) {
            color = randomColor({
              luminosity: "bright",
              format: "rgba",
              alpha: 0.8
            });
            this.colorMap.set(issue.key, color);
          }
          return new IssuePart(issue, index, all.length, color);
        }
      );

      const startDateIndex = this.dates.findIndex(date =>
        isSame(date, startDate)
      );

      let dueDateIndex = this.dates.findIndex(date => 
        isSame(date, endDate)
      );

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

        const issuePart: IssuePart = issueParts[idx];

        data.push(issuePart);
        issuesMap.set(JSON.stringify({ row, col }), data);

        const cellType: CellType = this.getCellType(col);

        const cell: Cell = this.createCell(
          row,
          col,
          data,
          cellType,
          false,
          ListDataViewer,
          this.users[userIndex]
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
        var emptyCell;
        if (i === 0 || j === 0) {
          emptyCell = this.createCell(i, j, [], cellType, true, ListDataViewer);
        } else {
          emptyCell = this.createCell(i, j, [], cellType, false, ListDataViewer, this.users[j-1], this.dates[i-1]);
        }
        
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
    isHeader: boolean,
    dataViewer?: any,
    user?: User,
    date?: Date
  ): Cell {
    return {
      row: row,
      col: col,
      value: value,
      DataViewer: dataViewer,
      cellType: cellType,
      isHeader: isHeader,
      user: user,
      date: date
    };
  }

  private addCell(cell: Cell): void {
    this.data[cell.row][cell.col] = cell;
  }
}

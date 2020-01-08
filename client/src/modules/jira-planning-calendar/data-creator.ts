import { Cell } from "./model/cell/cell";
import { Issue } from "./domain/issue/Issue";
import { User } from "./domain/user/user";
import moment from "moment";
import ListDataViewer from "./components/ListDataViewer";
import ReadOnlyDataViewer from "./components/ReadOnlyDataViewer";

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
    const dates = this.generateDates(new Date(this.startDate), new Date(this.endDate));

    for (let index = 0; index < dates.length; index++) {
      const cell = this.createCell(index + 1, 0, dates[index], ReadOnlyDataViewer);
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

      const dateCell = this.dates.find(
        x => x.value === issue.created.toLocaleDateString()
      );

      const userCell = this.users.find(
        x => x.value === issue.assignee.displayName
      );

      if (dateCell && userCell) {
        const col = dateCell.col;
        const row = userCell.row;

        let data = issuesMap.get(JSON.stringify({ row, col }));

        if (!data) {
          data = [];
        }

        data.push(issue.key);
        issuesMap.set(JSON.stringify({ row, col }), data);
        const cell = this.createCell(col, row, data, ListDataViewer);
        this.issues.push(cell);
      }
    }
  }

  private create(): void {
    const start = moment(this.startDate.setDate(this.startDate.getDate() - 1));
    const end = moment(this.endDate);

    const rowCount = this.users.length + 1;
    const columnCount = Math.trunc(moment.duration(end.diff(start)).asDays()) + 1;

    console.log(this.startDate);
    console.log(this.endDate);

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
      col: col,
      row: row,
      value: value,
      DataViewer: dataViewer
    };
  }

  private addCell(cell: Cell): void {
    this.data[cell.row][cell.col] = cell;
  }

  private generateDates(startDate: Date, endDate: Date) {
    var dateArray = new Array<string>();
    var currentDate = startDate;

    while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate).toLocaleDateString());
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }
}

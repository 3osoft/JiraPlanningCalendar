import { Cell } from "./model/cell/cell";
import { Issue } from "./domain/issue/Issue";
import { User } from "./domain/user/user";
import moment from "moment";
import ListDataViewer from './components/data-viewer/ListDataViewer';

export class CalendarDataCreator {
  private data = new Array<Array<Cell>>();
  private users = new Array<Cell>();
  private issues = new Array<Cell>();
  private dates = new Array<Cell>();
  private startDate?: Date;
  private endDate?: Date;

  get calendarData() {
    return this.data;
  }

  constructor(users: Array<User>, issues: Array<Issue>, startDate: Date, endDate: Date) {
    this.addDates(startDate, endDate);
    this.addUsers(users);
    this.addIssues(issues);
    this.create();
  }

  private addDates(startDate: Date, endDate: Date): void {
    this.startDate = startDate;
    this.endDate = endDate;

    const dates = this.generateDates(startDate, endDate);

    for (let index = 0; index < dates.length; index++) {
      const cell = this.createCell(index + 1, 0, dates[index]);
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
    if (!this.users) {
      throw new Error('Issues can not be displayed without users. You need to set the users.')
    }

    if (!this.dates) {
      throw new Error('Issues can not be displayed without dates. You need to set rhe dates.');
    }
    
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

        let data = issuesMap.get(JSON.stringify({row, col}));

        if (!data) {
          data = [];
        } 

        data.push(issue.key)
        console.log(data);
        console.log(issuesMap);
        issuesMap.set(JSON.stringify({row, col}), data);
        const cell = this.createCell(col, row, data, ListDataViewer);
        this.issues.push(cell);        
      }
    }
  }

  private create(): void {
    let rowCount: number = 1;
    let columnCount: number = 7;

    if (this.startDate && this.endDate) {
      const start = moment(
        this.startDate.setDate(this.startDate.getDate() - 1)
      );
      const end = moment(this.endDate);

      columnCount = Math.trunc(moment.duration(end.diff(start)).asDays()) + 1;
    }

    if (this.users) {
      rowCount = this.users.length + 1;
    }

    for (let i = 0; i < rowCount; i++) {
      let row: Array<Cell> = new Array<Cell>();
      for (let j = 0; j < columnCount; j++) {
        row.push(this.createCell(j, i, ""));
      }
      this.data.push(row);
    }

    // dates
    if (this.dates) {
      this.dates.forEach(x => {
        this.addCell(x);
      });
    }

    // users
    if (this.users) {
      this.users.forEach(x => {
        this.addCell(x);
      });
    }

    // issues
    if (this.issues) {
      this.issues.forEach(x => {
        this.addCell(x);
      });
    }
  }

  private createCell(col: number, row: number, value: any, dataViewer?: any): Cell {
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

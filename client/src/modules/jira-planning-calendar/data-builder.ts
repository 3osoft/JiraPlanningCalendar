import { Cell } from "./model/cell/cell";
import { Issue } from "./domain/issue/Issue";
import { User } from "./domain/user/user";
import moment from "moment";

export class SheetDataBuilder {
  private data = new Array<Array<Cell<any>>>();
  private users = new Array<Cell<any>>();
  private issues = new Array<Cell<any>>();
  private dates = new Array<Cell<any>>();
  private startDate?: Date;
  private endDate?: Date;

  addDates<T>(startDate: Date, endDate: Date) {
    this.startDate = startDate;
    this.endDate = endDate;

    const dates = this.generateDates(startDate, endDate);

    for (let index = 0; index < dates.length; index++) {
      const cell = this.createCell<T>(index + 1, 0, dates[index]);
      this.dates.push(cell);
    }
    return this;
  }

  addUsers<T>(users: Array<User>): SheetDataBuilder {
    for (let index = 0; index < users.length; index++) {
      const cell = this.createCell<T>(0, index + 1, users[index].displayName);
      this.users.push(cell);
    }
    return this;
  }

  addIssues<T>(issues: Array<Issue>): SheetDataBuilder {
    if (!this.users) {
      throw new Error('Issues can not be displayed without users. You need to set the users.')
    }

    if (!this.dates) {
      throw new Error('Issues can not be displayed without dates. You need to set rhe dates.');
    }
    
    const issuesMap = new Map<{row: number, col: number}, Cell<any>>();

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
        const existingCell = issuesMap.get({row, col});

        let newValue;
        if (existingCell && existingCell.value) {
          newValue = `${existingCell.value}\n${issue.key}`;
        } else {
          newValue = issue.key;
        }

        const cell = this.createCell<T>(col, row, newValue);
        issuesMap.set({row, col}, cell);
        this.issues.push(cell);        
      }
    }

    return this;
  }

  build(): Array<Array<Cell<any>>> {
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
      let row: Array<Cell<any>> = new Array<Cell<any>>();
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

    return this.data;
  }

  private createCell<T>(col: number, row: number, value: string): Cell<T> {
    const dataViewer: T = {} as T;

    return {
      col: col,
      row: row,
      value: value,
      dataViewer: dataViewer
    };
  }

  private addCell(cell: Cell<any>): void {
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

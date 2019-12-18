import { Cell } from "./cell";
import { User } from "../user/user";
import { Issue } from "../issue/Issue";

export class SheetDataBuilder {
  private data = new Array<Array<Cell>>();
  private startDate = new Date(new Date().setDate(new Date().getDate() - 1));
  private endDate = new Date(new Date().setDate(new Date().getDate() + 100));

  constructor() {
    this.initData();
  }

  addUsers(users: Array<User>): SheetDataBuilder {
    for (let index = 0; index < users.length; index++) {
      const cell = this.createCell(0, index + 1, users[index].displayName);
      this.addCell(cell);
    }
    return this;
  }

  addIssues(issues: Array<Issue>): SheetDataBuilder {
    for (let index = 0; index < issues.length; index++) {
      const issue = issues[index];
      const dateCell = this.data[0].find(
        x => x.value === issue.created.toLocaleDateString()
      );
      const userCell = this.data
        .map(x => x[index])
        .find(x => x.value === issue.assignee.displayName);
      const project = issue.key;
      if (dateCell && userCell) {
        const cell = this.createCell(dateCell.col, userCell.row, project);
        this.addCell(cell);
      }
    }
    return this;
  }

  build(): Array<Array<Cell>> {
    return this.data;
  }

  private createCell(col: number, row: number, value: string): Cell {
    return {
      col: col,
      row: row,
      value: value
    };
  }

  private addCell(cell: Cell): void {
    const x = cell.row;
    const y = cell.col;
    this.data[x][y] = cell;
  }

  private initData(): void {
    const dates = this.generateDates(this.startDate, this.endDate);

    for (let i = 0; i < 100; i++) {
      let row: Array<Cell> = new Array<Cell>();
      for (let j = 0; j < 100; j++) {
        let cell;
        if (i === 0 && j > 0) {
          cell = { row: i, col: j, value: dates[j] } as Cell;
        } else {
          cell = { row: i, col: j, value: "" } as Cell;
        }
        row.push(cell);
      }
      this.data.push(row);
    }
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

import { Cell } from "./domain/cell/cell";
import { Issue } from "./domain/issue/Issue";
import { User } from "./domain/user/user";

export class SheetDataBuilder {
  private rowCount: number;
  private columnCount: number;
  private data = new Array<Array<Cell>>();
  private startDate = new Date(new Date().setDate(new Date().getDate() - 1));
  private endDate = new Date(new Date().setDate(new Date().getDate() + 100));

  constructor(rowCount: number, columnCount) {
    this.rowCount = rowCount;
    this.columnCount = columnCount;
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
    const userCells = this.data.map(x => x[0]);
        
    for (let index = 0; index < issues.length; index++) {
      const issue = issues[index];
      const dateCell = this.data[0].find(
        x => x.value === issue.created.toLocaleDateString()
      );
      
      const userCell = userCells.find(x => x.value === issue.assignee.displayName);

      if (dateCell && userCell) {
        const col = dateCell.col;
        const row = userCell.row;
        const existingCell = this.data[row][col];

        let newValue;
        if (existingCell.value) {
          newValue = `${existingCell.value}\n${issue.key}`;
        } else {
          newValue = issue.key
        }

        const cell = this.createCell(col, row, newValue);
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
    this.data[cell.row][cell.col] = cell;
  }

  private initData(): void {
    const dates = this.generateDates(this.startDate, this.endDate);

    for (let i = 0; i < this.rowCount; i++) {
      let row: Array<Cell> = new Array<Cell>();
      for (let j = 0; j < this.columnCount; j++) {
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

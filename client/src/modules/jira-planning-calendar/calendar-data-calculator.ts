import { CalendarData } from "./model/calendar-data";
import { Issue } from "./domain/issue/issue";
import { User } from "./domain/user/user";
import { getNumberOfDays, getDateRange, isSame } from "../shared/date-helper";
import { CellType } from "./model/cell/cell-type";
import { Cell } from "./model/cell/cell";
import ListDataViewer from "./components/ListDataViewer";
import { IssuePart } from "./domain/issue/issue-part";
import DateViewer from "./components/DateViewer";
var randomColor = require("randomcolor");

export class CalendarDataCalculator {

    public static calculateInitialSheetData(
        users: Array<User>,
        issues: Array<Issue>,
        startDate: Date,
        endDate: Date
    ): CalendarData {
        const dates = getDateRange(startDate, endDate);

        const result = {
            users: users,
            dates: dates,
            issues: issues,
            sheetData: [],
            colorMap: new Map<string, string | undefined>()
        } as CalendarData;

        const currentDateColumnIndex = getNumberOfDays(startDate, new Date());
        this.initializeToEmptyCells(result, currentDateColumnIndex);

        this.fillDateCells(result.dates, result.sheetData);
        this.fillUserCells(result.users, result.sheetData);
        this.fillIssueCells(result, currentDateColumnIndex);
        return result;
    }

    private static fillIssueCells(calendarData: CalendarData, currentDateColumnIndex: number): void {
        const issuesMap = new Map<string, Array<IssuePart>>();

        calendarData.issues.forEach((issue: Issue) => {
            const startDate = issue.startDate ? issue.startDate : issue.created;
            const endDate = issue.dueDate ? issue.dueDate : calendarData.dates[calendarData.dates.length - 1];

            const issueParts: IssuePart[] = getDateRange(startDate, endDate).map(
                (_date, index, all) => {
                    let color = calendarData.colorMap.get(issue.key);

                    if (!color) {
                        color = randomColor({
                            luminosity: "bright",
                            format: "rgba",
                            alpha: 0.8
                        });
                        calendarData.colorMap.set(issue.key, color);
                    }
                    return new IssuePart(issue, index, all.length, color);
                }
            );

            const startDateIndex = calendarData.dates.findIndex(date =>
                isSame(date, startDate)
            );

            let dueDateIndex = calendarData.dates.findIndex(date => 
                isSame(date, endDate)
            );

            if (dueDateIndex !== -1) {
                dueDateIndex = dueDateIndex + 1;
            }

            const dateCells = calendarData.dates.slice(startDateIndex, dueDateIndex);
            const userIndex = calendarData.users.findIndex(
                (user: User) => user.accountId === issue.assignee.accountId
            );

            if (userIndex === -1) {
                throw new Error(
                    "No users were found. Without users, issues cannot be displayed"
                );
            }

            const row = userIndex + 1;
            dateCells.forEach((_dateCell, idx) => {
                const col = startDateIndex + idx + 1;

                let data = issuesMap.get(JSON.stringify({ row, col }));

                if (!data) {
                    data = [];
                }

                data.push(issueParts[idx]);
                issuesMap.set(JSON.stringify({ row, col }), data);

                const cellType: CellType = this.getCellType(col, currentDateColumnIndex);

                const cell: Cell = this.createCell(
                    row,
                    col,
                    data,
                    cellType,
                    false,
                    ListDataViewer,
                    calendarData.users[userIndex]
                );
                this.addCell(cell, calendarData.sheetData);
            });
        });
    }

    private static fillDateCells(dates: Date[], sheetData: Cell[][]): void {
        dates.forEach((date: Date, index: number) => {
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
            this.addCell(cell, sheetData);
        });
    }

    private static fillUserCells(users: User[], sheetData: Cell[][]): void {
        users.forEach((user: User, index: number) => {
            const cell = this.createCell(
                index + 1,
                0,
                user.displayName,
                CellType.READONLY,
                true,
                undefined,
                user
            );
            this.addCell(cell, sheetData);
        });
    }

    private static initializeToEmptyCells(calendarData: CalendarData, currentDateColumnIndex: number): void {
        for (let i = 0; i < calendarData.users.length + 1; i++) {
            calendarData.sheetData[i] = [];
            for (let j = 0; j < calendarData.dates.length + 1; j++) {
                const cellType: CellType = this.getCellType(j, currentDateColumnIndex);
                var emptyCell;
                if (i === 0 || j === 0) {
                    emptyCell = this.createCell(i, j, [], cellType, true, ListDataViewer);
                } else {
                    emptyCell = this.createCell(i, j, [], cellType, false, ListDataViewer, calendarData.users[j - 1], calendarData.dates[i - 1]);
                }

                this.addCell(emptyCell, calendarData.sheetData);
            }
        }
    }

    private static getCellType(currentCol: number, currentDateColumnIndex: number): CellType {
        let cellType: CellType;
        console.log(currentDateColumnIndex)
        if (currentDateColumnIndex === currentCol) {
            cellType = CellType.DRAG_AND_DROP;
        } else if (currentDateColumnIndex < currentCol) {
            cellType = CellType.DRAGGABLE;
        } else {
            cellType = CellType.READONLY;
        }
        return cellType;
    }

    private static createCell(
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

    private static addCell(cell: Cell, sheetData: Cell[][]): void {
        sheetData[cell.row][cell.col] = cell;
    }
}
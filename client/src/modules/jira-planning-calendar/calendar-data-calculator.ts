import { CalendarData } from "./model/calendar-data";
import { Issue } from "./domain/issue/issue";
import { User } from "./domain/user/user";
import { getNumberOfDays, getDateRange, isSame } from "../shared/date-helper";
import { CellType } from "./model/cell/cell-type";
import { Cell } from "./model/cell/cell";
import ListDataViewer from "./components/ListDataViewer";
import { IssuePart } from "./domain/issue/issue-part";
import DateViewer from "./components/DateViewer";
import { Position } from "../shared/position";
import { Query } from "./data-service";
import randomColor from "randomcolor";
import { COLOR_MAP } from "../shared/local-storage-constants";

export class CalendarDataCalculator {

    public static calculateInitialSheetData(
        users: Array<User>,
        issues: Array<Issue>,
        query: Query
    ): CalendarData {
        const dates = getDateRange(query.startDate, query.endDate);

        const result = {
            users: users.sort(),
            dates: dates,
            issues: issues,
            sheetData: [],
            colorMap: this.getColorsFromLocalStorage()
        } as CalendarData;

        const currentDateColumnIndex = getNumberOfDays(query.startDate, new Date());
        this.initializeToEmptyCells(result, currentDateColumnIndex);

        this.fillDateCells(result.dates, result.sheetData);
        this.fillUserCells(result.users, result.sheetData);
        this.fillIssueCells(result, result.issues, query.showWithoutDueDate);
        return result;
    }

    public static recalculateChangedIssues(originalCalendarData: CalendarData, changedIssues: Array<Issue>): [CalendarData, Position[]] {
        const result = { ...originalCalendarData };
        let changedPositions = [] as Position[];

        // remove original issue parts
        for (let i = 1; i < result.sheetData.length; i++) {
            for (let j = 1; j < result.sheetData[i].length; j++) {
                const cell = result.sheetData[i][j];
                const values = cell.value as IssuePart[];
                const indexesToRemove = [] as number[];
                if (values.length > 0) {
                    let valueChanged = false;
                    values.forEach((issuePart, index) => {
                        if (changedIssues.includes(issuePart.issue)) {
                            indexesToRemove.push(index);
                            valueChanged = true;
                        }
                    });

                    indexesToRemove.reverse().forEach(indexToRemove => {
                        values.splice(indexToRemove, 1);
                    });
                    if (valueChanged) {
                        cell.value = values;
                        changedPositions.push({
                            row: i,
                            col: j
                        });
                    }
                }
            }
        }

        changedPositions = changedPositions.concat(this.fillIssueCells(result, changedIssues, true));
        return [result, changedPositions];
    }

    private static fillIssueCells(calendarData: CalendarData, issues: Array<Issue>, showWithoutDueDate: boolean): Position[] {
        const changedPositions = [] as Position[];
        issues.forEach((issue: Issue) => {
            if (issue.dueDate || showWithoutDueDate) {                
                const startDate = this.calculateIssueStartDate(issue, calendarData.dates[0]);
                const endDate = this.calculateIssueEndDate(issue, calendarData);

                const issueParts: IssuePart[] = getDateRange(startDate, endDate).map(
                    (_date, index, all) => {
                        let color = calendarData.colorMap.get(issue.project.key);

                        if (!color) {
                            color = randomColor({
                                luminosity: "bright",
                                format: "rgba",
                                alpha: 0.8
                            });
                            calendarData.colorMap.set(issue.project.key, color);
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
                    let cellValue = calendarData.sheetData[row][col].value;

                    let dataCell = calendarData.sheetData[row][col] as Cell;

                    if (!cellValue) {
                        cellValue = [];
                    }

                    cellValue.push(issueParts[idx]);
                    this.addCell(dataCell, calendarData.sheetData);
                    changedPositions.push({
                        row: row,
                        col: col
                    });
                });
            }
        });
        this.addColorsToLocalStorage(calendarData.colorMap);
        return changedPositions;
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
                let emptyCell: Cell;
                if (i === 0 || j === 0) {
                    emptyCell = this.createCell(i, j, [], cellType, true, ListDataViewer);
                } else {
                    emptyCell = this.createCell(i, j, [], cellType, false, ListDataViewer, calendarData.users[i - 1], calendarData.dates[j - 1]);
                }

                this.addCell(emptyCell, calendarData.sheetData);
            }
        }
    }

    private static getCellType(currentCol: number, currentDateColumnIndex: number): CellType {
        let cellType: CellType;
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

    private static addColorsToLocalStorage(colorMap: Map<string, string | undefined>): void {
        localStorage.setItem(COLOR_MAP, JSON.stringify(Array.from(colorMap.entries())));
    }

    private static getColorsFromLocalStorage(): Map<string, string | undefined> {
        const localStorageData = localStorage.getItem(COLOR_MAP);
        return localStorageData ? new Map<string, string | undefined>(JSON.parse(localStorageData)) : new Map<string, string | undefined>();
    }

    private static calculateIssueStartDate(issue: Issue, sheetStartDate: Date): Date {
        const tempStartDate = issue.startDate ? issue.startDate : issue.created;                
        const startDate = tempStartDate < sheetStartDate ? sheetStartDate : tempStartDate;
        return startDate;
    }

    private static calculateIssueEndDate(issue: Issue, calendarData: CalendarData): Date {
        let alternativeEndDayIndex: number = calendarData.dates.length - 1;
        if (!issue.dueDate && issue.timeEstimate) {
            alternativeEndDayIndex = Math.ceil(issue.timeEstimate / 3600 / 8);
        }

        const endDate = issue.dueDate ? issue.dueDate : calendarData.dates[alternativeEndDayIndex];
        return endDate;
    }
}
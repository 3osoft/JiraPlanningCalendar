import { User } from "../domain/user/user";
import { Issue } from "../domain/issue/issue";
import { Cell } from "./cell/cell";

export interface CalendarData {
    users: Array<User>;
    issues: Array<Issue>;
    dates: Array<Date>;
    sheetData: Array<Array<Cell>>;
    colorMap: Map<string, string | undefined>;
}
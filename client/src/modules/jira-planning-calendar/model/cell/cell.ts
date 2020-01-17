import { CellType } from "./cell-type";
import { User } from "../../domain/user/user";

export interface Cell {
    row: number;
    col: number;
    value: any;
    selected?: Array<any>;
    DataViewer?: any;
    cellType: CellType;

    isHeader: boolean;
    date?: Date;
    user?: User;
}
import { CellType } from "./cell-type";

export interface Cell {
    row: number;
    col: number;
    value: any;
    selected?: Array<any>;
    DataViewer?: any;
    cellType: CellType
}
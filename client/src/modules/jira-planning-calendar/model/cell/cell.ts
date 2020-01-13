export interface Cell {
    id: string;
    row: number;
    col: number;
    value: any;
    selected?: Array<any>;
    DataViewer?: any;
}
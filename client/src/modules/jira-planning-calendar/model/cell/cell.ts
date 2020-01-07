export interface Cell<T> {
    row: number;
    col: number;
    value: string;
    dataViewer?: T;
}
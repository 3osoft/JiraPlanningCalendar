import { Cell } from "./model/cell/cell";

export interface State {
   isLoading: boolean;
   data: Array<Array<Cell>>;
   error?: string;
 }
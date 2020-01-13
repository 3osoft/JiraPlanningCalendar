import { Cell } from "./model/cell/cell";
import { MultiDragItem } from "./model/cell/multi-drag-item";

export interface State {
   isLoading: boolean;
   data: Array<Array<Cell>>;
   multiDragItems: Array<MultiDragItem>;
   errors: Array<string>;
 }
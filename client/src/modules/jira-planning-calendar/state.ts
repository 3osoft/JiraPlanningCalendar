import { CalendarData } from "./model/calendar-data";

export interface State {
   isLoading: boolean;
   calendarData: CalendarData;
   errors: Array<string>;
 }
import moment from "moment";

export const  getDateRange = (startDate: Date, endDate: Date): Array<string> => {
   var dateArray = new Array<string>();
   var currentDate = new Date(startDate);

   while (currentDate <= endDate) {
     dateArray.push(new Date(currentDate).toLocaleDateString());
     currentDate.setDate(currentDate.getDate() + 1);
   }
   return dateArray;
 }

 export const getNumberOfDays = (startDate: Date, endDate: Date): number => {
   const start = moment(startDate.setDate(startDate.getDate() - 1));
   const end = moment(endDate);
   return Math.trunc(moment.duration(end.diff(start)).asDays());
 }

 export const isToday = (date: Date): boolean => {
  return moment(date).isSame(moment(), 'day');
 }

 export const isFuture = (date: Date): boolean => {
  return moment(date).isAfter(moment(), 'day');
 }
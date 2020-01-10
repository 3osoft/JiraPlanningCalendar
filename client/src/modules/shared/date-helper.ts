import moment from "moment";

export const  getDateRange = (startDate: Date, endDate: Date): Array<string> => {
   var dateArray = new Array<string>();
   var currentDate = startDate;

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
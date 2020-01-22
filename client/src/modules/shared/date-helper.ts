import moment from 'moment';

export const getDateRange = (startDate: Date, endDate: Date): Array<Date> => {
  const dateArray = new Array<Date>();
  const start = moment(startDate).startOf('day').add(-1, 'days');
  const end =  moment(endDate).startOf('day').add(1, 'days');

  while (start.add(1, 'days').diff(end) < 0) {
    dateArray.push(start.clone().toDate())
  }
  return dateArray;
};

export const getNumberOfDays = (startDate: Date, endDate: Date): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const startMoment = moment(start.setDate(start.getDate() - 1));
  const endMoment = moment(end);
  return Math.trunc(moment.duration(endMoment.diff(startMoment)).asDays());
};

export const isToday = (date: Date): boolean => {
  return moment(date).isSame(moment(), "day");
};

export const isFuture = (date: Date): boolean => {
  return moment(date).isAfter(moment(), "day");
};

export const isSame = (date1: Date, date2: Date): boolean => {
  const date1Moment = moment(date1);
  const date2Moment = moment(date2);

  return (
    date1Moment.isSame(date2Moment, "year") &&
    date1Moment.isSame(date2Moment, "month") &&
    date1Moment.isSame(date2Moment, "day")
  );
};

export const calculateNumberOfDays = (startDate: Date, endDate: Date): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const startMoment = moment(start);
  const endMoment = moment(end);

  return startMoment.diff(endMoment, 'day');
}

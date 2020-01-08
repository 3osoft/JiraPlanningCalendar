import { getData, Query } from "./data-loader";
import { IssueParser } from "./domain/issue/issue-parser";
import { CalendarDataCreator } from "./data-creator";
import { UserParser } from "./domain/user/user-parser";
import moment from 'moment';

export class DataService {
  private defaultQuery = {
    startDate: moment().startOf('isoWeek').toDate(),
    endDate: moment().endOf('isoWeek').toDate()
  }

  async loadData(query: Query = this.defaultQuery) {
    const data = await getData(query)
   
    const users = new UserParser().parseArrayFromJson(data[0].data);
    const issues = new IssueParser().parseArrayFromJson(data[1].data.issues);

    const result = new CalendarDataCreator(users, issues, query.startDate, query.endDate).calendarData;
    console.log(result);
    return result;
  }
}

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
    let result;
    try {
      result = await getData(query)
    } catch(e) {
      result = null;
    }
    
    const users = result ? new UserParser().parseArrayFromJson(result[0].data) : [];
    const issues = result ? new IssueParser().parseArrayFromJson(result[1].data.issues) : [];

    return new CalendarDataCreator(users, issues, query.startDate, query.endDate).calendarData;
  }
}

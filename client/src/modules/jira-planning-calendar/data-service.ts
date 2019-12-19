import { getData, Query } from "./data-loader";
import { IssueParser } from "./domain/issue/issue-parser";
import { SheetDataBuilder } from "./data-builder";
import { UserParser } from "./domain/user/user-parser";
import moment from 'moment';

export class DataService {
  private defaultQuery = {
    startDate: moment().startOf('isoWeek').toDate(),
    endDate: moment().endOf('isoWeek').toDate()
  }

  async loadData(query: Query = this.defaultQuery) {
    const result = await getData(query);

    const users = new UserParser().parseArrayFromJson(result[0].data);
    const issues = new IssueParser().parseArrayFromJson(result[1].data.issues);

    const startDate = query.startDate;
    const endDate = query.endDate;
    const rowCount = users.length + 1;
    const data = new SheetDataBuilder(rowCount, startDate, endDate)
      .addUsers(users)
      .addIssues(issues)
      .build();

    return data;
  }
}

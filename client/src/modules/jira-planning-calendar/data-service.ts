import moment from "moment";
import { User } from "./domain/user/user";
import { UserParser } from "./domain/user/user-parser";
import { IssueParser } from "./domain/issue/issue-parser";
import { axiosInstance } from "../../axios";
import { CalendarData } from "./model/calendar-data";
import { CalendarDataCalculator } from "./calendar-data-calculator";
import {
  customFieldConverter,
  CustomField
} from "./../shared/custom-field-converter";

export class DataService {
  private defaultQuery = {
    startDate: moment()
      .startOf("isoWeek")
      .toDate(),
    endDate: moment()
      .endOf("isoWeek")
      .toDate(),
    showWithoutDueDate: false
  } as Query;

  async loadData(query: Query = this.defaultQuery): Promise<CalendarData> {
    const data = await this.getData(query);
    const users = new UserParser().parseArrayFromJson(data[0].data);
    const issues = new IssueParser().parseArrayFromJson(data[1].data.issues);
    return CalendarDataCalculator.calculateInitialSheetData(
      users,
      issues,
      query
    );
  }

  async updateIssues(issuesData: UpdateIssueData[]): Promise<any> {
    const requests = <any>[];
    issuesData.forEach(issueData => {
      let endpointUrl = `/issue/${issueData.issueKey}`;
      let requestBody = { update: {} };
      if (issueData.newAssignee !== undefined) {
        requestBody.update = {
          ...requestBody.update,
          assignee: [{ set: { accountId: issueData.newAssignee?.accountId } }]
        };
      }
      if (issueData.newStartDate !== undefined) {
        // TODO change start date
      }

      requests.push(axiosInstance.put(endpointUrl, requestBody));
    });

    return Promise.all(requests);
  }

  private getData(query?: Query) {
    let userUrl = "/users";
    let issuesUrl = "/issues";
    let issuesQuery;
    if (query) {
      if (query.userName) {
        userUrl = `${userUrl}/${query.userName}`;
      }

      const startDate = moment(query.startDate).format("YYYY-MM-DD");
      const endDate = moment(query.endDate).format("YYYY-MM-DD");

      const startDateField = customFieldConverter(CustomField.START_DATE);

      const dateQuery = `(${startDateField} is not null and ${startDateField} <= ${endDate} and (due >= ${startDate} or due is null)) 
      or (${startDateField} is null and created <= ${endDate} and (due >= ${startDate} or due is null))`;
      issuesQuery = dateQuery;

      if (query.issue) {
        issuesQuery = `${issuesQuery} and issue = ${query.issue}`;
      }
    }

    return Promise.all([
      axiosInstance.get(userUrl),
      axiosInstance.post(issuesUrl, { jql: issuesQuery })
    ]);
  }
}

export interface Query {
  userName?: string;
  issue?: string;
  startDate: Date;
  endDate: Date;
  showWithoutDueDate: boolean;
}

export interface UpdateIssueData {
  issueKey: string;
  newAssignee?: User;
  newStartDate?: Date;
}

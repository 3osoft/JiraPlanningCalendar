import moment from "moment";
import { Issue } from "./domain/issue/issue";
import { User } from "./domain/user/user";
import { Project } from "./domain/project/project";
import { UserParser } from "./domain/user/user-parser";
import { IssueParser } from "./domain/issue/issue-parser";
import { axiosInstance } from "../../axios";
import { CalendarData } from "./model/calendar-data";
import { CalendarDataCalculator } from "./calendar-data-calculator";

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
      query.startDate,
      query.endDate
    );

    return testData();
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

      const dateQuery = `cf[10015] <= ${endDate} and due >= ${startDate}`;
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

const testData = () => {
  const users = [
    {
      displayName: "Adam Blasko",
      accountId: "0",
      accountType: "atlassian",
      isActive: true
    } as User,
    {
      displayName: "Ben Kusicky",
      accountId: "1",
      accountType: "atlassian",
      isActive: true
    } as User,
    {
      displayName: "Ivan Janovic",
      accountId: "2",
      accountType: "atlassian",
      isActive: true
    } as User
  ];

  const project = {
    key: "JPC",
    name: "Jira planning calendar"
  } as Project;

  const issue1 = new Issue(
    "XAM-5147",
    project,
    users[0],
    users[0],
    new Date(),
    undefined,
    new Date(new Date().setDate(new Date().getDate() + 2)),
    ["Start date is not defined"]
  );
  const issue2 = new Issue(
    "XAM-5777",
    project,
    users[1],
    users[1],
    new Date(),
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 1))
  );

  const startDate = moment()
    .startOf("isoWeek")
    .toDate();
  const endDate = moment()
    .endOf("isoWeek")
    .toDate();

  return CalendarDataCalculator.calculateInitialSheetData(
    users,
    [issue1, issue2],
    startDate,
    endDate
  );
};

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

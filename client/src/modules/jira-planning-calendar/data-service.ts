import { CalendarDataCreator } from "./data-creator";
import moment from "moment";
import { Issue } from "./domain/issue/issue";
import { User } from "./domain/user/user";
import { Project } from "./domain/project/project";

export class DataService {
  private defaultQuery = {
    startDate: moment()
      .startOf("isoWeek")
      .toDate(),
    endDate: moment()
      .endOf("isoWeek")
      .toDate()
  };

  async loadData(query: Query = this.defaultQuery) {
    // const data = await this.getData(query);
    // const users = new UserParser().parseArrayFromJson(data[0].data);
    // const issues = new IssueParser().parseArrayFromJson(data[1].data.issues);
    // return new CalendarDataCreator(users, issues, query.startDate, query.endDate)

    return testData();
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
    new Date(new Date().setDate(new Date().getDate() +0)),
    new Date(new Date().setDate(new Date().getDate() + 1))
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

  const result = new CalendarDataCreator(
    users,
    [issue1, issue2],
    startDate,
    endDate
  ).calendarData;
  return result;
};

export interface Query {
  userName?: string;
  issue?: string;
  startDate: Date;
  endDate: Date;
}

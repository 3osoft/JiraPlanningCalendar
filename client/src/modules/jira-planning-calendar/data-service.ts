import { IssueParser } from "./domain/issue/issue-parser";
import { CalendarDataCreator } from "./data-creator";
import { UserParser } from "./domain/user/user-parser";
import ListDataViewer from "./components/ListDataViewer";
import { axiosInstance } from "../../axios";
import moment from "moment";
import { Cell } from "./model/cell/cell";

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
    // const result = new CalendarDataCreator(users, issues, query.startDate, query.endDate).calendarData;
    //console.log(result)
    const result = [
      [
        {
          id: '1',
          row: 0,
          col: 0,
          value: ["Raspberry", "Apple"],
          selected: [],
          DataViewer: ListDataViewer
        } as Cell,
        {
          id: '2',
          row: 0,
          col: 1,
          value: ["Paprika", "Onion"],
          selected: [],
          DataViewer: ListDataViewer
        } as Cell
      ],
      [
        {
          id: '3',
          row: 1,
          col: 0,
          value: ["Cola", "Fanta", "Sprite"],
          selected: [],
          DataViewer: ListDataViewer
        } as Cell
      ]
    ];
    return result;
  }

  private getData(query?: Query) {
    let userUrl = "/users";
    let issuesUrl = "/issues";

    if (query) {
      if (query.userName) {
        userUrl = `${userUrl}/${query.userName}`;
      }

      var issuesQuery = "";
      if (query.issue) {
        issuesQuery = `${issuesQuery}project=${query.issue}&`;
      }

      var startDate = moment(query.startDate).format("YYYY-MM-DD");
      issuesQuery = `${issuesQuery}created>=${startDate}&`;

      var endDate = moment(query.endDate).format("YYYY-MM-DD");
      issuesQuery = `${issuesQuery}created<=${endDate}&`;

      if (issuesQuery.endsWith("&")) {
        issuesQuery = issuesQuery.slice(0, -1);
      }

      issuesUrl = `${issuesUrl}/${issuesQuery}`;
    }

    return Promise.all([
      axiosInstance.get(userUrl),
      axiosInstance.get(issuesUrl)
    ]);
  }
}

export interface Query {
  userName?: string;
  issue?: string;
  startDate: Date;
  endDate: Date;
}

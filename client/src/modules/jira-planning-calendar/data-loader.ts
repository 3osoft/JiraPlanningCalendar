import { axiosInstance } from "../../axios";
import moment from "moment";

export function getData(query?: Query) {
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

export interface Query {
  userName?: string;
  issue?: string;
  startDate: Date;
  endDate: Date;
}

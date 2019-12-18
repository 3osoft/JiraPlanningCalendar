import { getData, Query } from "./data-loader";
import { IssueParser } from "./domain/issue/issue-parser";
import { SheetDataBuilder } from "./data-builder";
import { UserParser } from "./domain/user/user-parser";

export class DataService {

  async loadData(query?: Query) {
    const result = await getData(query);

    const users = new UserParser().parseArrayFromJson(result[0].data);
    const issues = new IssueParser().parseArrayFromJson(result[1].data.issues);
    const data = new SheetDataBuilder(users.length + 1, 100)
      .addUsers(users)
      .addIssues(issues)
      .build();

    return data;
  }
}

import { getData } from "./data-loader";
import { UserParser } from "../user/user-parser";
import { IssueParser } from "../issue/issue-parser";
import { SheetDataBuilder } from "./data-builder";

export class DataService {
  async loadData() {
    const result = await getData();

    const users = new UserParser().parseArrayFromJson(result[0].data);
    const issues = new IssueParser().parseArrayFromJson(result[1].data.issues);
    const data = new SheetDataBuilder()
      .addUsers(users)
      .addIssues(issues)
      .build();

    return data;
  }
}

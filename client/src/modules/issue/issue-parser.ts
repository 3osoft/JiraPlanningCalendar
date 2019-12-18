import { Parser } from "../shared/parser";
import { Issue } from "./Issue";
import { UserParser } from "./../user/user-parser";
import { ProjectParser } from "./../project/project-parser";

export class IssueParser implements Parser<Issue> {
  fromJson(data: any): Issue {
    const userParser = new UserParser();
    const projectParser = new ProjectParser();

    return {
      key: data.key,
      assignee: userParser.fromJson(data.fields.assignee),
      creator: userParser.fromJson(data.fields.creator),
      created: new Date(data.fields.created),
      project: projectParser.fromJson(data.fields.project)
    } as Issue;
  }

  toJson(data: Issue) {
    throw new Error("Method not implemented.");
  }

  parseArrayFromJson(data: any): Array<Issue> {
    const result = new Array<Issue>();
    data.forEach(element => {
      result.push(this.fromJson(element));
    });
    return result;
  }

  parseArrayToJson(data: Issue[]) {
    throw new Error("Method not implemented.");
  }
}

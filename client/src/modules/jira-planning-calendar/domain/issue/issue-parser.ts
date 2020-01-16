import { Parser } from "../../../shared/parser";
import { Issue } from "./issue";
import { UserParser } from "../user/user-parser";
import { ProjectParser } from "../project/project-parser";

export class IssueParser implements Parser<Issue> {
  fromJson(data: any): Issue {
    const userParser = new UserParser();
    const projectParser = new ProjectParser();

    const key = data.key;
    const assignee = userParser.fromJson(data.fields.assignee);
    const creator = userParser.fromJson(data.fields.creator);
    const created = new Date(data.fields.created);
    const project = projectParser.fromJson(data.fields.project);
    const startDate = data.fields.customfield_10015 ? new Date(data.fields.customfield_10015) : undefined;
    const dueDate = data.fields.duedate ? new Date(data.fields.duedate) : undefined;

    return new Issue(key, project, assignee, creator, created, startDate, dueDate);
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

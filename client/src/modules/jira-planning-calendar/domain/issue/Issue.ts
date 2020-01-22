import { Project } from "../project/project";
import { User } from "../user/user";
import { JIRA_BROWSE_URL } from "../../../../jira";

export class Issue {
  key: string;
  project: Project;
  assignee: User;
  creator: User;
  created: Date;
  startDate: Date | undefined;
  dueDate: Date | undefined;
  url: string;

  constructor(
    key: string,
    project: Project,
    assignee: User,
    creator: User,
    created: Date,
    startDate: Date | undefined,
    dueDate: Date | undefined,
  ) {
    this.key = key;
    this.project = project;
    this.assignee = assignee;
    this.creator = creator;
    this.created = created;
    this.startDate = startDate;
    this.dueDate = dueDate;
    this.url = `${JIRA_BROWSE_URL}${key}`;
  }
}

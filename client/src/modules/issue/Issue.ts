import { Project } from './../project/project';
import { User } from '../user/user';

export interface Issue {
   key: string;
   project: Project;
   assignee: User;
   creator: User;
   created: Date;
}
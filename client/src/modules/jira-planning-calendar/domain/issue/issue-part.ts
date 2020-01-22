import { Issue } from "./issue";
import { v4 as uuid } from 'uuid';

export class IssuePart {
   id: string;
   issue: Issue;
   actualPart: number;
   totalParts: number;
   color: string | undefined;

   get isStart(): boolean {
      return this.actualPart === 0;
   }

   get isEnd(): boolean {
      return this.actualPart === this.totalParts - 1;
   }

   get isSinglePart(): boolean {
      return this.totalParts === 1;
   }

   get title(): string {
      return this.issue.key;
   }

   constructor(issue: Issue, actualPart: number, totalParts: number, color: string | undefined) {
      this.id = uuid();
      this.issue = issue;
      this.actualPart = actualPart;
      this.totalParts = totalParts;
      this.color = color;
   }
}
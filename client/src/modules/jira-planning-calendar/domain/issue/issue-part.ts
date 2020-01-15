import { Issue } from "./issue";
import { v4 as uuid } from 'uuid';

export class IssuePart {
   id: string;
   issue: Issue;
   actualPart: number;
   totalParts: number;

   get isStart(): boolean {
      return this.actualPart === 0;
   }

   get isEnd(): boolean {
      return this.actualPart === this.totalParts - 1;
   }

   get isSinglePart(): boolean {
      return this.totalParts === 1;
   }

   constructor(issue: Issue, actualPart: number, totalParts: number) {
      this.id = uuid();
      this.issue = issue;
      this.actualPart = actualPart;
      this.totalParts = totalParts;      
   }
   
}
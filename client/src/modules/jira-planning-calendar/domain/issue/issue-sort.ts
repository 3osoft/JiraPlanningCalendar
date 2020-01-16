import { IssuePart } from "./issue-part";

export const sortByLengthAndKey = (item1: IssuePart, item2: IssuePart) => {
   if (item1.issue.key > item2.issue.key) {
     return 1;
   }

   return item1.totalParts < item2.totalParts ? 1 : -1;
 }
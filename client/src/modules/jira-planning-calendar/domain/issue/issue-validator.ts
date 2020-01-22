import { Issue } from "./issue";

export const validate = (issue: Issue): Array<string> => {
   const validationResult: Array<string> = [];

   if (!issue.startDate) {
      validationResult.push('Start date is not defined.');
   }

   return validationResult;
}
import { Issue } from "./issue";

export const validate = (issue: Issue): Array<string> => {
   const validationResult: Array<string> = [];

   if (!issue.startDate) {
      validationResult.push('Start date is not defined.');
   }

   if (!issue.dueDate && issue.timeEstimate) {
      validationResult.push('Issue duration calculated based on estimations.');
   }

   if (!issue.dueDate && !issue.timeEstimate) {
      validationResult.push('Issue without due date and estimations.');
   }

   return validationResult;
}
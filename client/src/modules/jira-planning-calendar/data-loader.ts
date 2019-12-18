import { axiosInstance } from "../../axios";

export function getData() {
  var userPromise = axiosInstance.get("/users");
  var issuesPromise = axiosInstance.get("/issues");

  return Promise.all([userPromise, issuesPromise]);
}

import { FETCH_DATA } from "./action-types";

export function fetchData(data) {
  return {
    type: FETCH_DATA,
    data
  };
}

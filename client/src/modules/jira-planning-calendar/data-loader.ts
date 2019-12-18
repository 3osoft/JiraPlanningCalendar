import { axiosInstance } from '../../axios';

export function getData(query?: Query) {
  let userUrl = '/users';
  let issuesUrl = '/issues';

  if (query) {
    if (query.userName) {
      userUrl = `${userUrl}/${query.userName}`;
    }

    if (query.issue) {
      issuesUrl = `${issuesUrl}/${query.issue}`;
    }
  }
  return Promise.all([axiosInstance.get(userUrl), axiosInstance.get(issuesUrl)]);
}

export interface Query {
  userName?: string;
  issue?: string;
}

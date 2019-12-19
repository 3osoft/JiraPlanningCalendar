export default function httpGet(addon, req, res, url) {
  var httpClient = addon.httpClient(req);
  
  var options = function(url) {
    var credentials = require("./credentials.json");
    var key = "https://bkjira.atlassian.net/";
    var userName = credentials.hosts[key].username;
    var password = credentials.hosts[key].password;

    return {
      url: url,
      auth: { username: userName, password: password },
      headers: {
        "Content-Type": "application/json"
      }
    };
  };

  httpClient.get(options(url), function(error, response, body) {
    res.status(response.statusCode).send(body);
  });
}

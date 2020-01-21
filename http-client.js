export function httpGet(addon, req, res, url) {
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

export function httpPost(addon, req, res, url) {
  var httpClient = addon.httpClient(req);
  
  var options = function(url) {
    var credentials = require("./credentials.json");
    var key = "https://bkjira.atlassian.net/";
    var userName = credentials.hosts[key].username;
    var password = credentials.hosts[key].password;

    return {
      url: url,
      method: 'POST',
      auth: { username: userName, password: password },
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    };
  };

  httpClient.post(options(url), function(error, response, body) {
    res.status(response.statusCode).send(body);
  });
}

export function httpPut(addon, req, res, url) {
  var httpClient = addon.httpClient(req);
  
  var options = function(url) {
    var credentials = require("./credentials.json");
    var key = "https://bkjira.atlassian.net/";
    var userName = credentials.hosts[key].username;
    var password = credentials.hosts[key].password;

    return {
      url: url,
      method: 'PUT',
      auth: { username: userName, password: password },
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    };
  };

  httpClient.put(options(url), function(error, response, body) {
    res.status(response.statusCode).send(body);
  });
}

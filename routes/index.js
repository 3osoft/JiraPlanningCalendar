export default function routes(app, addon) {
   // Redirect root path to /atlassian-connect.json,
   // which will be served by atlassian-connect-express.
   app.get('/', (req, res) => {
      res.redirect('/atlassian-connect.json');
   });

   // This is an example route used by "generalPages" module (see atlassian-connect.json).
   // Verify that the incoming request is authenticated with Atlassian Connect.
   app.get('/hello-world', addon.authenticate(), (req, res) => {
      // Rendering a template is easy; the render method takes two params:
      // name of template and a json object to pass the context in.

      res.render('hello-world', {
         title: 'Atlassian Connect'
         //issueId: req.query['issueId']
      });
   });

   // Add additional route handlers here...
   app.get('/users', addon.authenticate(), function (req, res) {
      var url = 'https://bkjira.atlassian.net/rest/api/latest/users/search';
      var httpClient = addon.httpClient(req);
      
      httpClient.get(options(url, 'GET'), function (error, response, body) {
         if (error) throw new Error(error);
         console.log(
            'Response: ' + response.statusCode + ' ' + response.statusMessage
         );
         res.send(body);
      });
   });

   app.get('/users/:query', addon.authenticate(), function (req, res) {
      var query = req.params.query;
      var url = 'https://bkjira.atlassian.net/rest/api/latest/user/search?query=' + query
      var httpClient = addon.httpClient(req);

      httpClient.get(options(url, 'GET'), function (error, response, body) {
         if (error) throw new Error(error);
         console.log(
            'Response: ' + response.statusCode + ' ' + response.statusMessage
         );
         res.send(body);
      });
   });

   app.get('/issues', addon.authenticate(), function (req, res) {
      var date = new Date().toISOString().slice(0, 10);
      var url = 'https://bkjira.atlassian.net/rest/api/latest/search?jql=project=JIR&created>' + date;
      var httpClient = addon.httpClient(req);

      httpClient.get(options(url), function (error, response, body) {
         if (error) throw new Error(error);
         console.log(
            'Response: ' + response.statusCode + ' ' + response.statusMessage
         );
         res.send(body);
      });
   });

   var options = function(url) {
      var credentials = require('../credentials.json');
      var userName = credentials.hosts['https://bkjira.atlassian.net/'].username;
      var password = credentials.hosts['https://bkjira.atlassian.net/'].password;

      return {
         url: url,
         auth: { username: userName, password: password },
         headers: {
            'Content-Type': 'application/json'
         },
      }
   }
}

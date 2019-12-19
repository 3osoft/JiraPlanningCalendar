import httpGet from '../http-client';

export default function routes(app, addon) {
   //var httpGet = require('../http-client');
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

      httpGet(addon, req, res, url);
   });

   app.get('/users/:query', addon.authenticate(), function (req, res) {
      var query = req.params.query;
      var url = `https://bkjira.atlassian.net/rest/api/latest/user/search?query=${query}`;
      
      httpGet(addon, req, res, url);
   });

   app.get('/issues/:query', addon.authenticate(), function (req, res) {     
      var query = req.params.query;
      var url = `https://bkjira.atlassian.net/rest/api/latest/search?jql=${encodeURIComponent(query)}`;

      httpGet(addon, req, res, url);
   });
}


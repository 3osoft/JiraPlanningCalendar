import {httpGet, httpPut, httpPost} from '../http-client';

export default function routes(app, addon) {
   //var httpGet = require('../http-client');
   // Redirect root path to /atlassian-connect.json,
   // which will be served by atlassian-connect-express.
   app.get('/', (req, res) => {
      res.redirect('/atlassian-connect.json');
   });

   app.get('/jira-planning-calendar', addon.authenticate(), (req, res) => {
      // Rendering a template is easy; the render method takes two params:
      // name of template and a json object to pass the context in.

      res.render('jira-planning-calendar', {
         title: 'Jira Planning Calendar'
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

   app.post('/issues', addon.authenticate(), function (req, res) {     
      //var query = req.params.query;
      var url = `https://bkjira.atlassian.net/rest/api/latest/search`;

      httpPost(addon, req, res, url);
   });

   app.put('/issue/:query', addon.authenticate(), function (req, res) {     
      var query = req.params.query;
      var url = `https://bkjira.atlassian.net/rest/api/latest/issue/${encodeURIComponent(query)}`;

      httpPut(addon, req, res, url);
   });
}



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
    app.get('/users', addon.authenticate(), function(req, res) {
         var options = {
            method: 'GET',
            url: 'https://bkjira.atlassian.net/rest/api/latest/users/search',
            auth: { username: 'kusicky13@gmail.com', password: 'Lv4aCJB1qYOt6gox0ZAxB547' },
            headers: {
               'Content-Type': 'application/json'
            },
         };

         var httpClient = addon.httpClient(req);
         httpClient.get(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(
               'Response: ' + response.statusCode + ' ' + response.statusMessage
            );
            res.send(body);
         });         
      });

      app.get('/issues', addon.authenticate(), function(req, res) {
         var date = new Date().toISOString().slice(0, 10);
         var options = {
            method: 'GET',
            url: 'https://bkjira.atlassian.net/rest/api/latest/search?jql=project=JIR&created>' + date,
            auth: { username: 'kusicky13@gmail.com', password: 'Lv4aCJB1qYOt6gox0ZAxB547' },
            headers: {
               'Content-Type': 'application/json'
            },
         };

         var httpClient = addon.httpClient(req);
         httpClient.get(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(
               'Response: ' + response.statusCode + ' ' + response.statusMessage
            );
            res.send(body);
         });         
      });
}

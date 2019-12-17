var proxy = require('express-http-proxy');

module.exports = function set_react_catchall_routes(app) {
    /* Final route to send anything else to react server. */
    console.log("Setting up catchall routes to react")
    app.use(proxy('localhost:3000'));
}

const routes = require('next-routes')();

routes
    .add('/buying/:address', '/buying/show')
    .add('/owner/:owner', '/owner/show')
    .add('/artist/:artist', '/artist/show');

module.exports = routes;

//This is for dynamic routing.

//We are using the next-routes package to give easy dynamic routing ability to next.js
//We pass routes into server.js to run the app.
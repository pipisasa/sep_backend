const dbRoutes = require('./dbRoutes');
module.exports = function(app, db) {
  dbRoutes(app, db);
};
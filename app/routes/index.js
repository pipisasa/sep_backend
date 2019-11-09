const dbRoutes = require('./dbRoutes');
const CATsRoutes = require('./CATsRoutes')
module.exports = function(app, db) {
  dbRoutes(app, db);
  CATsRoutes(app, db)
};
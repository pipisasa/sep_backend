const dbRoutes = require('./dbRoutes');
const CATsRoutes = require('./CATsRoutes');
const orderRoutes = require('./orderRoutes')
module.exports = function(app, db) {
  dbRoutes(app, db);
  CATsRoutes(app, db);
  orderRoutes(app, db);
};
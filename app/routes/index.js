const dbRoutes = require('./dbRoutes');
const CATsRoutes = require('./CATsRoutes');
const orderRoutes = require('./orderRoutes');
const imgRoutes = require('./imgRoutes')
module.exports = function(app, db, dir) {
  dbRoutes(app, db, dir);
  CATsRoutes(app, db);
  orderRoutes(app, db);
  imgRoutes(app, db, dir)
};
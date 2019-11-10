let ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db, dir){
    app.get('/img/:imgName', (req, res)=>{
        res.sendFile(`${dir}/uploads/${req.params.imgName}`)
    })
}
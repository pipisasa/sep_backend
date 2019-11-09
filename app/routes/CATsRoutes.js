let ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db){

    app.get('/categories', (req,res)=>{
        db.collection('categories').find({}).toArray((err, data)=>{
            if (err) { 
                res.send({ 'error': 'An error has occurred' }); 
            } else {
                res.send(JSON.stringify(data))
            }
        })
    })

}
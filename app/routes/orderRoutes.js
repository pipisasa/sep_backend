let ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db){
    app.post('/newOrder', (req, res) => {
        db.collection('orders').insertOne(req.body, (err, result) => {
            if (err) { 
                res.send({ 'error': 'An error has occurred' }); 
            } else {
                db.collection('orders').find({}).toArray((err,data)=>{
                    if(err){
                        res.send({ 'error': 'An error has occurred' }); 
                    } else {
                        res.send(JSON.stringify(data))
                    }
                })
            }
        });
    });

    app.get('/orders',(req, res)=>{
        db.collection('orders').find({}).toArray((err,data)=>{
            if(err){
                res.send({ 'error': 'An error has occurred' }); 
            } else {
                res.send(JSON.stringify(data))
            }
        })
    })

    app.delete('/deleteOrder/:id', async (req, res) => {
        const id = req.params.id;
        const details = { "_id": new ObjectID(id) };
        db.collection('orders').remove(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.status(200);
                res.send('OK')
            } 
        });
    });

}
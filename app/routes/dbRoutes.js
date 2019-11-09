let ObjectID = require('mongodb').ObjectID
module.exports = function(app, db) {
    
    //-------------GET-ALL-ITEM---------//
    app.get('/items', (req, res)=>{
        db.collection('items').find({}).toArray((err, data)=>{
            if (err) { 
                res.send({ 'error': 'An error has occurred' }); 
            } else {
                res.send(JSON.stringify(data))
            }
        })
    })

    //------------FIND-NAME-OR-CATEGORY-------------//
    app.get('/find/', async (req, res)=>{
        const name = req.query.name;
        const category = req.query.category;
        if(name){
            const details = { name: name};
        }else if(category){
            const details = { category: category };
        }else{
            res.send({'err':'An error has occured'})
        }
        db.collection('items').find(details).toArray((err,data) => {
            if (err) { 
                res.send({ 'error': 'An error has occurred' }); 
            } else {
                res.send(JSON.stringify(data))
            }
        })
    })


    //--------NEW ITEM------------//____x-www-form-urlencoded_____
    app.post('/newItem', (req, res) => {
        const item = { 
            name: req.body.name,
            description: req.body.description,
            prise: req.body.prise,
            category: req.body.category 
        };
        db.collection('items').insertOne(item, (err, result) => {
            if (err) { 
                res.send({ 'error': 'An error has occurred' }); 
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    

    //------------FIND-ID-----------------//
    app.get('/find-id/:id', async (req, res) => {
        const id = req.params.id;
        const details = {_id: new ObjectID(id)};
        db.collection('items').findOne(details, (err, item) => {
            if(err){
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(item);
            }
        })
    });


    //------------EDIT-ID--------------//____x-www-form-urlencoded_____
    app.put ('/edit/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const item = { 
            name: req.body.name,
            description: req.body.description,
            prise: req.body.prise,
            category: req.body.category 
        };
        db.collection('items').update(details, item, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.status(200);
                res.send('OK')
            } 
        });
    });

    //------------DELETE-ID--------------//
    app.delete('/delete/:id', (req, res) => {
        const id = req.params.id;
        const details = { "_id": new ObjectID(id) };
        db.collection('items').remove(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.status(200);
                res.send('OK')
            } 
        });
    });
};
let ObjectID = require('mongodb').ObjectID;

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

    //------------FIND-NAME-------------//
    app.get('/find/name', async (req, res)=>{
        const name = req.query.name;
        const details = { name: name};
        db.collection('items').find(details).toArray((err,data) => {
            if (err) { 
                res.send({ 'error': 'An error has occurred' }); 
            } else {
                res.send(JSON.stringify(data))
            }
        })
    })
    
    //------------FIND-CATEGORY-------------//
    app.get('/find/category', async (req, res)=>{
        const category = req.query.category;
        const details = { category: category };
        db.collection('items').find(details).toArray((err,data) => {
            if (err) { 
                res.send({ 'error': 'An error has occurred' }); 
            } else {
                res.send(JSON.stringify(data))
            }
        })
    })


    //--------NEW ITEM------------//____json_____
    app.post('/newItem', (req, res) => {
        const item = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            categoryName: req.body.categoryName
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


    //------------EDIT-ID--------------//____json_____
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
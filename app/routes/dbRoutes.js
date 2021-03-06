let ObjectID = require('mongodb').ObjectID;
let multer  =   require('multer');
let fs = require('fs')



module.exports = function(app, db, dir) {
    
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
    app.get('/find/name/:name', async (req, res)=>{
        const name = req.params.name;
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
    app.get('/find/category/:category', async (req, res)=>{
        const category = req.params.category;
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
    let objqwsa = {
        filename:''
    }
    var storage =   multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './uploads');
        },
        filename: function (req, file, callback) {
            objqwsa.filename = Date.now() + file.originalname;
            callback(null, objqwsa.filename);
        }
    });
    let upload = multer({ storage : storage}).fields([
        {name : 'img', maxCount: 1}
    ]);
    app.post('/newItem', upload, (req, res) => {
        req.body.img = objqwsa.filename;
        db.collection('items').insertOne(req.body, (err, result) => {
            if (err) { 
                res.send({ 'error': 'An error has occurred' }); 
            } else {
                upload(req,res,function(err) {
                    if ( err ) return res.end("Error uploading file.");
                    res.end("File is uploaded");
                });
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
        db.collection('items').update(details, req.body, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.status(200);
                res.send('OK')
            } 
        });
    });

    //------------DELETE-ID--------------//
    app.delete('/delete/:id', async (req, res) => {
        const id = req.params.id;
        const details = { "_id": new ObjectID(id) };
        await db.collection('items').findOne(details, (err, item)=>{
            fs.unlinkSync(`${dir}/uploads/${item.img}`);
        })
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
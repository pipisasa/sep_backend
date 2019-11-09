const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();

const port = 8000;

app.use(bodyParser.json({ extended: true }));

const uri = "mongodb+srv://pipisasa:0925mk2005@cluster0-o4dvt.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, database){
    if(err)return console.log(err);
    
    let db = database.db('contacts');
    
    require('./app/routes')(app, db);
    app.listen(port, () => {
      console.log('We are live on ' + port);
    }); 
})

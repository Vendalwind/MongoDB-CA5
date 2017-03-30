var express = require('express');
var router = express.Router();
var MONGO_DB_URI = "mongodb://localhost:27017/learn";

/**
 * Creates a new collection
 */
router.post('/mongo/create', function(req, res, next) {
    
    // Get the data that was sent in the post
    var data = req.body;

    // Initialize the mongo client
    var MongoClient = require('mongodb').MongoClient;
    
    // Connect to the database
    MongoClient.connect(MONGO_DB_URI, function(err, db) {
        if(err)
            return res.status(500).send(err);
        
        // Create the collection in the DB
        var collectionName = data.name;
        var options = data.options;
        db.createCollection(collectionName, options, function(err, collection) {
            if(err)
                return res.status(500).send(err);
            
            return res.status(201).send('Collection ' + collectionName + ' created successfully');
        });
    });
});

module.exports = router;

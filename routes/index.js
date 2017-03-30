var express = require('express');
var router = express.Router();
var MONGO_DB_URI = "mongodb://localhost:27017/learn";

/**
 * Creates a new collection
 */
router.post('/mongo/collections', function(req, res, next) {
    
    // Get the data that was sent in the post
    var data = req.body;

    // Initialize the mongo client
    var MongoClient = require('mongodb').MongoClient;
    
    // Connect to the database
    MongoClient.connect(MONGO_DB_URI, function(err, db) {
        if(err)
            return res.status(500).send(err);
        
        // Delete the collection if it exists
        var collectionName = data.name;
        var collection = db.collection(collectionName);
        collection.drop(function(err, reply) {});
        
        // Create the collection in the DB
        var options = data.options;
        db.createCollection(collectionName, options, function(err, collection) {
            if(err)
                return res.status(500).send(err);
            
            return res.status(201).send('Collection ' + collectionName + ' created successfully');
        });
    });
});


/**
 * Inserts a document into the specified collection
 */
router.post('/mongo/collections/:collection_name', function(req, res, next) {
    
    // Get the collection name
    var collectionName = req.params.collection_name;
    
    // Get the document to be inserted
    var toBeInserted = req.body;
    
    // Initialize the mongo client
    var MongoClient = require('mongodb').MongoClient;
    
    // Connect to the database
    MongoClient.connect(MONGO_DB_URI, function(err, db) {
        if(err)
            return res.status(500).send(err);
        
        // Get the collection by name
        var collection = db.collection(collectionName);
        
        // W1 means that the status of the operation will be returned
        collection.insert(toBeInserted, {w: 1}, function(err, result) {
            if(err)
                return res.status(500).send(err);
            
            return res.status(201).send(result);
        });
    });
    
});

module.exports = router;

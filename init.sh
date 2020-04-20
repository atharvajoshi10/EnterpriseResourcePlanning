#!/bin/sh

#Initializes the database, First deletes any old versions if present then imports from the dump directory
mongo < init_db.js
mongorestore

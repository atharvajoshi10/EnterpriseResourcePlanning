//Author - Atharva Joshi

//Describes process
//process_name : Name of the process, eg boring, drilling ...
//description : Explaination of the process
//worker_name : Name of the worker performing the process
//machine_id : objid of machine being used for the process
//username_created : Record user who created the process
//username_updated : Record user who updated the process
//timestamps : record the timestamp of update and creations

//Required import, Do not change
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const processSchema = new Schema({
    process_name: {
        type: String,
        trim: true,
        required: true
    },
    process_id :{
        type: String,
        trim:true
    },
    description: String,
    worker_id: {
        type: String,
        trim:true,
    },
    machine_id: {
        type: String,
        trim:true,
    },
    username_created : String,
    username_updated: String
},{
    timestamps: true
})

//Necesarry Export statement, Do not Change
const Process = mongoose.model('Process', processSchema);
module.exports = Process
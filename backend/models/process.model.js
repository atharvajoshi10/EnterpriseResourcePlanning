//Author - Atharva Joshi

//Describes process
//process_name : Name of the process, eg boring, drilling ...
//description : Explaination of the process
//username_created : Record user who created the process
//username_updated : Record user who updated the process
//timestamps : record the timestamp of update and creations

//Required import, Do not change
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const processSchema = new Schema({
    process_name: {
        type: String,
        required: true
    },
    description: String,
    username_created : String,
    username_updated: String
},{
    timestamps: true
});

//Necesarry Export statement, Do not Change
const Process = mongoose.model('Process', processSchema);

export default Process
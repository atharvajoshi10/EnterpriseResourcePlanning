//Describes process

//Required import, Do not change
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const processSchema = new Schema({
    process_name: {
        type: String,
        required: true
    },
    description: String
},{
    timestamps: true
});

//Necesarry Export statement, Do not Change
const Process = mongoose.model('Process', processSchema);

module.exports = Process;
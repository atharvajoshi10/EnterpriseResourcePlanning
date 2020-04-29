//Author - Atharva Joshi

//Describes Raw Material
//raw_material_name : Name of the raw material, eg GI steel,cast iron
//description : Optional Explaination
//category : Can be raw material like block of cast iron or consumable like machine oil or nuts and bolts
//quantity : Number of pieces 
//measurement : eq 30*30cm sheet of Galvanized iron
//unit : unit of measurement
//username_created : Record user who created the process
//username_updated : Record user who updated the process

//Required import, Do not change
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const raw_materialSchema = Schema({
    raw_material_name: {
        type: String,
        required: true
    },
    raw_material_id :{
        type: String,
        trim:true
    },
    description: String,
    category :{
        type:String,
        enum:['Raw', 'Consumable'],
        required : true
    },
    quantity: Number,
    measurement : String,
    unit :{
        type:String,
        enum:['Weight','Metrics','Volume','Quantity']
    },
    username_created : String,
    username_updated: String
},{
    timestamps: true
})


//Necesarry Export statement, Do not Change
const Raw_Material = mongoose.model('Raw_Material', raw_materialSchema);
module.exports = Raw_Material
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
        required :[true,'Raw Material name must be specified!'],
    },
    raw_material_id :{
        type: String,
        unique: true,
        trim:true,
        required :[true,'Raw Material Id must be specified!'],
    },
    description: String,
    category :{
        type:String,
        required :[true,'Raw Material Category must be specified!'],
        enum:{
            values: ['Raw', 'Consumable'],
            message: 'Category is either: Raw or Consumable'
        }
    },
    quantity: Number,
    measurement : String,
    unit :{
        type:String,
        enum:{
            values: ['Weight','Metrics','Volume','Quantity'],
            message: 'Unit is either: Weight, Metrics, Volume or Quantity'
        }
    },
    username_created :{
        type: String,
        ref: 'Employee'
    },
    username_updated: {
        type: String,
        ref: 'Employee'
    },
    raw_material_thumbnail_location: {
        type: String,
        default: '/img/raw_material/raw_material.jpg'
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});


//Necesarry Export statement, Do not Change
const Raw_Material = mongoose.model('Raw_Material', raw_materialSchema);
module.exports = Raw_Material;
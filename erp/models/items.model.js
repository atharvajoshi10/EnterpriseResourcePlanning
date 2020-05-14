//Describes model for the items/components

//item_name : Name of item eq angled bar
//description : Optional explaination
//drawing_number : identification for drawings
//drawing_location : location of file in fs
//process_list : list of processes
//              process_id : Objid of process
//              scheduled_date : Date when process is scheduled
//              instructions: Any specific instructions to worker
//attached_material : Any material required for the item
//               material_id : Objid of material
//               quantity : Quantity assigned 
//username_created : Record user who created the process
//username_updated : Record user who updated the process

//Required import, Do not change
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//Schema Definition
const itemSchema = new Schema({
    item_name:{
        type: String,
        required: [true,'Item name must be specified!'],
        trim:true
    },
    item_id :{
        type: String,
        unique: true,
        trim:true,
        required: [true,'Item id must be specified!']
    },
    description: String,
    drawing_number:{
        type: String,
        trim:true
    },
    drawing_location: {
        type:String,
        default: '/drawings/sample-pdf-file.pdf'
    },
    drawing_revision_number:{
        type:Number,
        default:-1
    },
    process_list: [{
        process: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Process'
        },
        scheduled_date: Date,
        status: {
            enum:['approved','delayed','completed']
        }
        //instructions: String
    }],
    attached_materials: [{
        material : {
            type:  mongoose.Schema.Types.ObjectId,
            ref:'Raw_Material'
        },
        quantity : Number
    }],
    username_created :{
        type: String,
        ref: 'Employee'
    },
    username_updated: {
        type: String,
        ref: 'Employee'
    },
    item_thumbnail_location: {
        type: String,
        default: '/img/items/item.jpg'
    }
},{
    timestamps:true,
})


//Necesarry Export statement, Do not Change
const Item = mongoose.model('Item', itemSchema);
module.exports = Item;

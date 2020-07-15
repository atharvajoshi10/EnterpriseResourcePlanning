//Author - Atharva Joshi

//Describes model for the Final Product
//fp_name : Name of final product
//description : Description of product
//items : List of items for the product
//username_created : Record user who created the process
//username_updated : Record user who updated the process
//timestamps : record time of creation and updation

//Required import, Do not change
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const final_productSchema = new Schema({
    fp_name : {
        type: String,
        trim:true,
        required: [true,'Final Product name must be specified!!']
    },
    fp_id :{
        type: String,
        trim:true,
        unique: true,
        required: [true, 'Final Product ID must be specified!']
    },
    description: String,
    items_list : [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        },
        status : {
            type: String,
            default: 'approved'
        }
    }],
    assembly_diagram_list: [{
        diagram_location: {
            type:String,
        },
        diagram_number:{
            type: String,
            trim:true
        },
        diagram_revision_number:{
            type:Number,
            default:0
        }
    }],
    username_created :{
        type: String,
        ref: 'Employee'
    },
    username_updated: {
        type: String,
        ref: 'Employee'
    },
    fp_thumbnail_location: {
        type: String,
        default: '/img/fp/fp.jpg'
    }
},{
    timestamps: true
})


const FinalProduct = mongoose.model('FinalProduct', final_productSchema);
module.exports = FinalProduct
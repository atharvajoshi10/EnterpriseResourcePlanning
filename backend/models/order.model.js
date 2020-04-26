//Author - Atharva Joshi

//Describes an order made by a customer
//po_number : Purchase order number for the product
//po_path : Path of the Purchase order pdf in the file system
//so_number : Sales order number for the product
//so_path : Path of the Sales order pdf in the file system
//fp_list : List of final products for the order
//item_list : List of Ala-carte items for the order
//username_created : Record user who created the process
//username_updated : Record user who updated the process
//timestamps : record time of creation and updation

//Required import, Do not change
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

orderSchema = new Schema({
    customer_id: String,
    po_number :{
        type : String,
        required : true
    },
    po_path: String,
    so_number : String,
    so_path: String,
    fp_list : [String],
    item_list : [String],
    username_created : String,
    username_updated: String
},{
    timestamps: true
})

//Necesarry Export statement, Do not Change
const Order = mongoose.model('Order',orderSchema)
export default Order
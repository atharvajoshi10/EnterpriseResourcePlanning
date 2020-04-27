//Author - Atharva Joshi

//Describes a customer
//c_id : Customer Id
//c_name : Customer Name
//c_phone : Customer Phone Number
//c_address : Address
//c_representative : Employees/ Inspectors representing the company 
//c_billing_address : Billing Address
//c_past_orders : List of objids of type order representing past orders
//c_current_orders : List of objids of type order representing current order

//Required import, Do not change
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

customerSchema = new Schema({
    c_id: {
        type : String,
        required : true
    },
    c_name : String,
    c_phone : Number,
    c_address : String,
    c_representative : [String],
    c_billing_address : String,
    c_past_orders : [String],
    c_current_orders: [String]
})

//Required Export statement, do not change
const Customer = mongoose.model('Customer',customerSchema)
module.exports = Customer
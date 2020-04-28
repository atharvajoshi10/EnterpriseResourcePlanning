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
//username_created : Record user who created the process
//username_updated : Record user who updated the process

//Required import, Do not change
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const validator = require('validator')

customerSchema = new Schema({
    c_name : {
        type: String,
        trim:true
    },
    c_phone : Number,
    c_email: {
        type: String,
        trim:true,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    c_address : String,
    c_representative : [String],
    c_billing_address : String,
    c_past_orders : [String],
    c_current_orders: [String],
    username_created : String,
    username_updated: String
},{
    timestamps: true
})

//Required Export statement, do not change
const Customer = mongoose.model('Customer',customerSchema)
module.exports = Customer
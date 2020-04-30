//Author - Atharva Joshi

//Describes a machine
//m_name : Name of the machine
//m_image_location : location of machine image in file system
//m_status : Working on which item
//m_purchase_date : Date of purchase
//m_maintainence : List of dates on which maintainence was performed
//m_consumable : List of consumable used and quantity
//m_cost : Cost of machine
//username_created : Record user who created the process
//username_updated : Record user who updated the process

//Required import, Do not change
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

machineSchema = new Schema({
    m_name: {
        type: String,
        trim:true,
    },
    m_image_location : {
        type:String,
        trim:true
    },
    m_status: [String],
    m_operator : {
        type:String,
        trim:true
    },
    m_purchase_date : Date,
    m_maintainence : [Date],
    m_consumable : [{
        m_consumable_id : {
            type: String,
            trim:true,
        },
        m_consumable_quantity : Number
    }],
    m_cost : Number,
    username_created :{
        type: String,
        ref: 'Employee'
    },
    username_updated: {
        type: String,
        ref: 'Employee'
    }
},{
    timestamps : true
})

//Required Export statement, do not change
const Machine = mongoose.model('Machine',machineSchema)
module.exports = Machine
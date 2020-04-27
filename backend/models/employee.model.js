//Author - Atharva Joshi

//Describes an employee 
//e_name : Name
//e_phone : Phone Number
//e_address : Current Address of the employee
//e_password : Employee Password
//e_attendance : Date, intime, out time
//e_responsibilities : Description of responsibilies and machine being used to perform that
//e_status : Currently working on which (product,process)
//e_salary : Salary
//username_created : Record user who created the process
//username_updated : Record user who updated the process

//Required import, Do not change
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

employeeSchema = new Schema({
    e_name : String,
    e_phone : String,
    e_address : String,
    e_password : String,
    e_attendance : {
        date : Date,
        in_time : Date,
        out_time : Date
    },
    e_responsibilities : [{
        description : String,
        machne_id : String
    }],
    e_status : [{
        item_id : String,
        p_id : String
    }],
    e_salary : Number,
    username_created : String,
    username_updated: String
},{
    timestamps:true
})

//Required export, do not change
const Employee = mongoose.model('Employee',employeeSchema)
module.exports = Employee
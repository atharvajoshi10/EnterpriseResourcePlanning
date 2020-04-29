//Author - Atharva Joshi

//Describes an employee 
//e_name : Name
//e_phone : Phone Number
//e_address : Current Address of the employee
//e_username : Employee Username
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
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const employeeSchema = new Schema({
    e_name : {
        type: String,
        trim:true,
    },
    e_phone : {
        type: String,
        validate(value){
            if(!validator.isMobilePhone(value,"en-IN")){
                throw new Error('Phone number is invalid')
            }
        }   
    },
    e_address : String,
    e_username : {
        type: String,
        unique:true,
        trim:true
    },
    e_password : {
        type: String,
        trim:true,
        select:false
    },
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
    username_updated: String,
    tokens:[{
        token: {
            type:String,
            required:true
        }
    }]
},{
    timestamps:true
})

//Employee Login Function
employeeSchema.statics.findByCredentials = async (e_username,e_password) =>{
    const employee = await Employee.findOne({e_username}).select("+e_password")
    if(!employee){
        throw new Error('Unable to Login!')
    }
    const isMatch = await bcrypt.compare(e_password,employee.e_password)
    if(!isMatch){
        throw new Error('Unable to Login!')
    }
    return employee
}

employeeSchema.methods.generateAuthToken = async function() {
    const employee = this
    const token = jwt.sign({e_username : employee.e_username},'vedEngineers', {expiresIn:'6 hours'})
    employee.tokens = employee.tokens.concat({token})
    await employee.save()
    return token
}


//middleware to hash password before add and update operations
employeeSchema.pre('save', async function(next){
    const employee = this
    if (employee.isModified('e_password')) {
        employee.e_password = await bcrypt.hash(employee.e_password,8)
    }
    next()
});


//Required export, do not change
const Employee = mongoose.model('Employee',employeeSchema)
module.exports = Employee

//statics methods are called using Model
//methods methods are called using instance
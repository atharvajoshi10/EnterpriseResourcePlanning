const jwt = require('jsonwebtoken')
const Employee = require('../models/employee.model')
//Middleware Function for Authorization
const auth = async (req,res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,'vedEngineers')
        //Find user with the correct username who has that authentication token still stored
        const employee = await Employee.findOne({e_username:decoded.e_username, 'tokens.token':token})

        if(!employee){
            throw new Error()
        }
        req.employee=employee
        req.token=token
        next()
    }catch{
        res.status(401).json({error: 'Please Authenticate.'})
    }
}

module.exports = auth